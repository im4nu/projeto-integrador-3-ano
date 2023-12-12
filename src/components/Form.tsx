"use client";

import { cardsData } from "@/utils/cards";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "iconsax-react";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Motion from "./Motion";
import { api } from "@/service/axios.config";

const SchemaValidation = z.object({
  age: z.string({ required_error: "Campo obrigatório" }),
  impregnated: z.boolean(),
  asthma: z.boolean(),
  obesity: z.boolean(),
  dispneia: z.boolean(),
  cardiopat: z.boolean(),
  hepatic: z.boolean(),
  riscFactor: z.boolean(),
  gender: z.enum(["Masculino", "Feminino"]),
  nosocomial: z.boolean(),
  AVE_SUINO: z.boolean(),
  FEBRE: z.boolean(),
  TOSSE: z.boolean(),
  GARGANTA: z.boolean(),
  DESC_RESP: z.boolean(),
  SATURACAO: z.boolean(),
  DIARREIA: z.boolean(),
  VOMITO: z.boolean(),
  OUTRO_SIN: z.boolean(),
  PUERPERA: z.boolean(),
  HEMATOLOGI: z.boolean(),
  SIND_DOWN: z.boolean(),
  DIABETES: z.boolean(),
  NEUROLOGIC: z.boolean(),
  PNEUMOPATI: z.boolean(),
  IMUNODEPRE: z.boolean(),
  RENAL: z.boolean(),
  VACINA: z.boolean(),
  ANTIVIRAL: z.boolean(),
  UTI: z.boolean(),
  SUPORT_VEN: z.boolean(),
  EVOLUCAO: z.boolean(),
  DOR_ABD: z.boolean(),
  FADIGA: z.boolean(),
  PERD_OLFT: z.boolean(),
  PERD_PALA: z.boolean(),
  TOMO_RES: z.boolean(),
  VACINA_COV: z.boolean(),
});

type FormData = z.infer<typeof SchemaValidation>;

const options = ["Masculino", "Feminino"] as const;

export default function Form() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    // reset,
  } = useForm<FormData>({
    defaultValues: {
      age: undefined,
      impregnated: false,
      asthma: false,
      gender: "Masculino",
      obesity: false,
      dispneia: false,
      cardiopat: false,
      hepatic: false,
      riscFactor: false,
      nosocomial: false,
      AVE_SUINO: false,
      FEBRE: false,
      TOSSE: false,
      GARGANTA: false,
      DESC_RESP: false,
      SATURACAO: false,
      DIARREIA: false,
      VOMITO: false,
      OUTRO_SIN: false,
      PUERPERA: false,
      HEMATOLOGI: false,
      SIND_DOWN: false,
      DIABETES: false,
      NEUROLOGIC: false,
      PNEUMOPATI: false,
      IMUNODEPRE: false,
      RENAL: false,
      VACINA: false,
      ANTIVIRAL: false,
      UTI: false,
      SUPORT_VEN: false,
      EVOLUCAO: false,
      DOR_ABD: false,
      FADIGA: false,
      PERD_OLFT: false,
      PERD_PALA: false,
      TOMO_RES: false,
      VACINA_COV: false,
    },
    resolver: zodResolver(SchemaValidation),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [classification, setClassification] = useState("");

  async function OnSubmit(data: FormData) {
    setIsLoading(true);
    try {
      const response = await api.post("/api/entrada", {
        CS_SEXO: data.gender === "Feminino" ? 0 : 1,
        NU_IDADE_N: data.age,
        CS_GESTANT: (+data.impregnated).toString(),
        NOSOCOMIAL: (+data.nosocomial).toString(),
        AVE_SUINO: (+data.AVE_SUINO).toString(),
        FEBRE: (+data.FEBRE).toString(),
        TOSSE: (+data.TOSSE).toString(),
        GARGANTA: (+data.GARGANTA).toString(),
        DISPNEIA: (+data.dispneia).toString(),
        DESC_RESP: (+data.DESC_RESP).toString(),
        SATURACAO: (+data.SATURACAO).toString(),
        DIARREIA: (+data.DIARREIA).toString(),
        VOMITO: (+data.VOMITO).toString(),
        OUTRO_SIN: (+data.OUTRO_SIN).toString(),
        PUERPERA: (+data.PUERPERA).toString(),
        FATOR_RISC: (+data.riscFactor).toString(),
        CARDIOPATI: (+data.cardiopat).toString(),
        HEMATOLOGI: (+data.HEMATOLOGI).toString(),
        SIND_DOWN: (+data.SIND_DOWN).toString(),
        HEPATICA: (+data.hepatic).toString(),
        ASMA: (+data.asthma).toString(),
        DIABETES: (+data.DIABETES).toString(),
        NEUROLOGIC: (+data.NEUROLOGIC).toString(),
        PNEUMOPATI: (+data.PNEUMOPATI).toString(),
        IMUNODEPRE: (+data.IMUNODEPRE).toString(),
        RENAL: (+data.RENAL).toString(),
        OBESIDADE: (+data.obesity).toString(),
        VACINA: (+data.VACINA).toString(),
        ANTIVIRAL: (+data.ANTIVIRAL).toString(),
        UTI: (+data.UTI).toString(),
        SUPORT_VEN: (+data.SUPORT_VEN).toString(),
        EVOLUCAO: (+data.EVOLUCAO).toString(),
        DOR_ABD: (+data.DOR_ABD).toString(),
        FADIGA: (+data.FADIGA).toString(),
        PERD_OLFT: (+data.PERD_OLFT).toString(),
        PERD_PALA: (+data.PERD_PALA).toString(),
        TOMO_RES: (+data.TOMO_RES).toString(),
        VACINA_COV: (+data.VACINA_COV).toString(),
      });
      const { resultado } = response.data;
      if (resultado === 2) {
        setClassification("Grupo de alto risco");
      } else {
        setClassification("Fora do grupo de risco");
      }
    } finally {
      setIsLoading(false);
      setSuccessModal(true);
      // reset();
    }
  }

  return (
    <>
      <form className="flex gap-8 w-4/5 flex-col items-center justify-center">
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você possui Asma?</p>
          <Controller
            name="asthma"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>

        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você possui Obesidade?</p>
          <Controller
            name="obesity"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>

        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você possui Dispneia - Dificuldade Respiratória?</p>
          <Controller
            name="dispneia"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>

        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você possui Cardiopatia - Doença Cardíaca?</p>
          <Controller
            name="cardiopat"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>

        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você possui alguma doença Hepática?</p>
          <Controller
            name="hepatic"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>

        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você se enquadra em um fator de risco?</p>
          <p className="text-xs">
            - Condição que aumenta a probabilidade de uma pessoa desenvolver uma
            determinada doença
          </p>
          <Controller
            name="riscFactor"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>
            Você trabalha ou tem contato direto com aves, suínos, ou outro
            animal?
          </p>
          {/*Aqui é Ave_suino*/}
          <Controller
            name="AVE_SUINO"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você está com febre?</p>
          <Controller
            name="FEBRE"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você está com Tosse?</p>
          <Controller
            name="TOSSE"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você está com dor de Garganta?</p>
          <Controller
            name="DESC_RESP"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você está com algum disconforto respiratório?</p>
          {/*DESC_RESP*/}
          <Controller
            name="DESC_RESP"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você está com Diarreia ou algum sintoma?</p>
          <Controller
            name="DIARREIA"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você está vomitando?</p>
          <Controller
            name="VOMITO"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>

        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você possui Doença Hematológica Crônica</p>
          <Controller
            name="HEMATOLOGI"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você possui possui Síndrome de Down?</p>
          <Controller
            name="SIND_DOWN"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você possui Diabetes?</p>
          <Controller
            name="DIABETES"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você possui Doença Neurológica?</p>
          <p className="text-xs">
            - Patologias que interferem no funcionamento do sistema nervoso
            central e periférico.
          </p>
          <Controller
            name="NEUROLOGIC"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você possui Pneumopatia crônica?</p>
          <Controller
            name="PNEUMOPATI"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você possui Imunodeficiência ou Imunodepressão</p>
          <p className="text-xs">
            - Diminuição da função do sistema imunológico.
          </p>
          <Controller
            name="IMUNODEPRE"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você possui Doença Renal Crônica?</p>
          <Controller
            name="RENAL"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você foi vacinado contra gripe na última campanha,</p>
          <Controller
            name="VACINA"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você fez uso suporte ventilatório nos últimos dias?</p>
          <Controller
            name="SUPORT_VEN"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você sentiu dores abdominais?</p>
          <Controller
            name="DOR_ABD"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você apresentou fadiga nesses últimos dias?</p>
          <Controller
            name="FADIGA"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você esta com perda do olfato?</p>
          <Controller
            name="PERD_OLFT"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você esta com perda do paladar</p>
          <Controller
            name="PERD_PALA"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você tomou alguma vacina para COVID-19</p>
          <Controller
            name="VACINA_COV"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você adquiriu Nossocomial?</p>
          <Controller
            name="nosocomial"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Sua saturação de 02 no sangue está maior que 95%?</p>
          <Controller
            name="SATURACAO"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você ficou internado na UTI devido a SARS?</p>
          <Controller
            name="UTI"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você possui outro sintoma?</p>
          <Controller
            name="OUTRO_SIN"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>

        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Qual o seu gênero</p>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <select
                id="selector"
                className="border py-2 px-4 rounded dark:bg-dark dark:text-white dark:border-white/30"
                value={field.value}
                onChange={field.onChange}
              >
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          />
        </div>

        {watch("gender") === "Feminino" && (
          <div className="flex flex-col items-start justify-center w-full gap-3">
            <p>Você está Gestante?</p>
            <Controller
              name="impregnated"
              control={control}
              render={({ field }) => (
                <div className="flex items-center">
                  <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                    <span className="text-center">Não</span>
                    <div className="relative flex w-12">
                      <input
                        type="checkbox"
                        id="toggle"
                        className="hidden"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                      <div
                        className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                          field.value ? "bg-blue-500" : "bg-gray-400"
                        }`}
                      />
                      <div
                        className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                          field.value
                            ? "transform translate-x-full bg-blue-500"
                            : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <span className="text-center">Sim</span>
                  </label>
                </div>
              )}
            />
          </div>
        )}

        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Você está com Puerpera?</p>
          <p className="text-xs">
            - Mulher que pariu recentemente – até 45 dias do parto?
          </p>
          <Controller
            name="PUERPERA"
            control={control}
            render={({ field }) => (
              <div className="flex items-center">
                <label className="cursor-pointer flex min-w-[150px] w-full justify-between flex-row h-fit">
                  <span className="text-center">Não</span>
                  <div className="relative flex w-12">
                    <input
                      type="checkbox"
                      id="toggle"
                      className="hidden"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    <div
                      className={`toggle__line w-10 h-4 rounded-full shadow-inner absolute top-1 left-0 ${
                        field.value ? "bg-blue-500" : "bg-gray-400"
                      }`}
                    />
                    <div
                      className={`toggle__dot absolute w-6 h-6 rounded-full shadow left-0 top-0 transition ${
                        field.value
                          ? "transform translate-x-full bg-blue-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <span className="text-center">Sim</span>
                </label>
              </div>
            )}
          />
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <p>Qual a sua Idade em anos?</p>
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <input
                type="number"
                placeholder="Digite sua idade"
                value={field.value}
                onChange={field.onChange}
                className="bg-white dark:bg-dark border-gray-200 flex items-start justify-center shadow-xl shadow-gray-300 dark:shadow-main/30 rounded-lg p-6"
              />
            )}
          />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>

        <button
          onClick={handleSubmit(OnSubmit)}
          className="bg-main rounded-lg py-4 w-[200px] flex flex-row text-white items-center justify-center gap-2"
        >
          {isLoading ? (
            <div className="flex w-6 h-6 rounded-full border-[2px] border-t-white border-b-white/30 animate-spin"></div>
          ) : (
            <>
              <p>Enviar</p>
              <Send variant="TwoTone" color="#fff" size={32} />
            </>
          )}
        </button>
      </form>

      <div
        className={`${
          successModal ? "lef-[0vw]" : "left-[100vw]"
        } flex flex-col text-center gap-4 fixed ease-linear duration-300 top-0 bg-white dark:bg-dark dark:text-white z-40 w-screen h-screen justify-center items-center`}
      >
        <Image
          alt="Ilustação"
          src={
            classification === "Fora do grupo de risco"
              ? "/images/ilustration.svg"
              : "/images/sad_ilustration.svg"
          }
          width={278}
          height={208}
          className="w-1/2 h-1/3"
        />

        <p className="w-4/5">
          De acordo com as suas respostar nós conseguimos te enquadrar em um
          grupo:
        </p>

        <>
          {cardsData
            .filter((card) => card.title === classification)
            .map((card) => (
              <Motion
                key={card.id}
                identifier={card.id}
                direction="top"
                className="flex items-center justify-center w-full"
              >
                <div className="flex relative h-[250px] bg-white dark:bg-dark flex-col items-start gap-4 justify-center w-4/5 rounded-lg shadow-2xl shadow-gray-400 dark:shadow-main/40 p-6">
                  <div className="flex w-full bg-main dark:bg-white absolute top-0 left-0 h-[1px]" />

                  {card.icon}

                  <h3 className="text-main font-medium">{card.title}</h3>
                  <p className="text-sm">
                    {" "}
                    Não utilize esta classificação como auto avaliação, procure
                    um médico ou técnico especializado
                  </p>
                </div>
              </Motion>
            ))}
        </>

        <button
          onClick={() => setSuccessModal(false)}
          className="bg-main rounded-lg py-4 w-[200px] flex flex-row text-white items-center justify-center gap-2"
        >
          Ok, entendi!
        </button>
      </div>
    </>
  );
}
