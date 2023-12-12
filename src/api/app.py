import locale
from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
from sklearn.tree import DecisionTreeClassifier
from flask_cors import CORS

# Definir a localidade para lidar com diferenças de formatação numérica
locale.setlocale(locale.LC_NUMERIC, 'en_US.UTF-8')

app = Flask(__name__)

# Resolver o erro de CORS
CORS(app)

# Inicializar o modelo e imputadores
classifier, imputer_numericas, imputer_categoricas = None, None, None

# Função para treinar o modelo e realizar o pré-processamento dos dados
def treinar_modelo():
    global classifier, imputer_numericas, imputer_categoricas
    
    try:
        # Carregar os dados
        data = pd.read_csv("INFLUD22-03-04-2023.csv", on_bad_lines='skip', delimiter=';', dtype=str)

        data = data.drop(["DT_NOTIFIC", "DT_SIN_PRI","OBES_IMC", "DT_NASC","OUT_MORBI", "DT_EVOLUCA", "DOSE_1_COV", "SG_UF", "CS_ZONA", "ESTRANG", "TP_FLU_AN", "POS_AN_OUT", "AN_SARS2", "RES_IGG", "RES_IGM", "RES_IGA", "RES_AN", "POS_PCROUT", "CLASSI_FIN", "TP_FLU_PCR", "PCR_FLUASU", "POS_AN_FLU", "RAIOX_RES", "POS_PCRFLU"], axis=1)


        df = pd.DataFrame(data, columns=data.columns)
        df = df.fillna(0)

        df['NU_IDADE_N'] = df['NU_IDADE_N'].astype(int)
        condicoes_baixo = (
            (df['NU_IDADE_N'] > 60),
            (df['OBESIDADE'] == "1"),
            (df['ASMA'] == "1"),
            (df['CS_GESTANT'].isin(["1", "2", "3"])),
            (df['FATOR_RISC'] == "1"),
            (df['DISPNEIA'] == "1"),
            (df['CARDIOPATI'] == "1"),
            (df['HEPATICA'] == "1")
        )
        contagem_condicoes = np.sum(condicoes_baixo, axis=0)
        df['GRUPO_DE_RISCO'] = np.where(
            contagem_condicoes >= 3,
            2,
            np.where(
                contagem_condicoes >= 1,
                1,
                0
            )
        )

        df['CS_SEXO'] = df['CS_SEXO'].map({'F': 0, 'M': 1})

        X = df.drop("GRUPO_DE_RISCO", axis=1)
        y = df["GRUPO_DE_RISCO"]

        # Crie um imputador que substitui NaN pela média da coluna
        imputer = SimpleImputer(strategy='mean')

        # Ajuste o imputador aos dados de treinamento e transforme-os
        X_train_imputed = imputer.fit_transform(X)

        classifier = DecisionTreeClassifier(criterion = 'entropy', random_state = 32)
        classifier.fit(X_train_imputed, y)

        #y_pred = classifier.predict(X_test_imputed) classificação
        #accuracy = accuracy_score(y_test, y_pred)

        print("Treinamento concluido")

    except Exception as e:
        print(f"Erro durante o treinamento do modelo: {e}")
        return None, None, None

# Treinar o modelo ao iniciar o servidor
treinar_modelo()

# Rota para previsões
@app.route('/api/entrada', methods=['POST'])
def processar_entrada():
    # Obtém os dados do JSON da requisição
    data = request.get_json()

    # Campos que você deseja incluir
    todas_features = ['CS_SEXO', 'NU_IDADE_N', 'CS_GESTANT', 'NOSOCOMIAL', 'AVE_SUINO',
                      'FEBRE', 'TOSSE', 'GARGANTA', 'DISPNEIA', 'DESC_RESP', 'SATURACAO',
                      'DIARREIA', 'VOMITO', 'OUTRO_SIN', 'PUERPERA', 'FATOR_RISC',
                      'CARDIOPATI', 'HEMATOLOGI', 'SIND_DOWN', 'HEPATICA', 'ASMA', 'DIABETES',
                      'NEUROLOGIC', 'PNEUMOPATI', 'IMUNODEPRE', 'RENAL', 'OBESIDADE',
                      'VACINA', 'ANTIVIRAL', 'UTI', 'SUPORT_VEN', 'EVOLUCAO', 'DOR_ABD',
                      'FADIGA', 'PERD_OLFT', 'PERD_PALA', 'TOMO_RES', 'VACINA_COV']

    # Verifica se todas as features estão presentes nos dados recebidos
    for feature in todas_features:
        if feature not in data:
            return jsonify({'error': f'A feature {feature} é obrigatória'}), 400

    # Cria um DataFrame com os dados de entrada
    entrada_df = pd.DataFrame({feature: [data[feature]] for feature in todas_features})

    # Realiza a previsão usando o modelo treinado
    try:
        resultado = int(classifier.predict(entrada_df)[0])
    except Exception as e:
        return jsonify({'error': f'Erro durante a previsão: {e}'}), 500

    # Retorna a resposta
    return jsonify({'resultado': resultado})

# if __name__ == '__main__':
#     app.run(debug=True)

# LEMBRE-SE DE ALTERAR O IP PARA O SEU IP LOCAL
if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)