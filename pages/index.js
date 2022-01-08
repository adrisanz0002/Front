import Link from "next/link";
import {
  Text,
  Flex,
  Input,
  Button,
  Box,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useEffect, useContext, useState } from "react";
import ContextoUsuario from "../Provider/providerUsuario";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import axios from "axios";
import Chart from "chart.js/auto";
import Factura from "./factura";
export default function Home() {
  const [data1, setData1] = useState(undefined);
  const [data2, setData2] = useState(undefined);
  const [data3, setData3] = useState(undefined);
  const [data4, setData4] = useState(undefined);
  const [facturas, setFacturas] = useState(undefined);
  const [importeFacturas, setImporteFacturas] = useState(-1);
  const [labelsFacturas, setLabelsFacturas] = useState(undefined);
  const [importesFacturas, setImportesFacturas] = useState([]);
  const [labelspropiedades, setLabelsPropiedades] = useState(undefined);
  const [importesPropiedades, setImportesPropiedades] = useState([]);
  const [propiedades, setPropiedades] = useState(undefined);
  const [importePropiedades, setImportePropiedades] = useState(-1);
  const [otrasIncidencias, setOtrasIncidencias] = useState(undefined);
  const [incidencias, setIncidencias] = useState(undefined);
  const { setUsuario } = useContext(ContextoUsuario);
  setUsuario(localStorage.getItem("User"));
  const getFacturas = async () => {
    await axios
      .get(`http://localhost:4000/api/facturas`)
      .then((res) => {
        setFacturas(res.data);
      });
  };
  const getPropiedades = async () => {
    await axios
      .get(`http://localhost:4000/api/propiedades`)
      .then((res) => {
        setPropiedades(res.data);
      });
  };
  const getOtrasIncidencias = async () => {
     await axios
      .get(`http://localhost:4000/api/otraIncidencia`)
      .then((res) => {
        setOtrasIncidencias(res.data);
      });
  };
  const getIncidencias = async () => {
     await axios
      .get(`http://localhost:4000/api/incidenciasMedicas`)
      .then((res) => {
        setIncidencias(res.data);
      });
  };
  const getAll =  async () => {
    const importeF = 0;
    const labelsF = [];
    const importesF = [];
    console.log("facturas")
    facturas.forEach(function (factura, index) {
      importeF = importeF + factura.importe;
      labelsF.push(factura.categoria);
      importesF.push(factura.importe);
    });
    setImporteFacturas(importeF);
    setLabelsFacturas(labelsF);
    setImportesFacturas(importesF);

    const importeP = 0;
    const labelsP = [];
    const importesP = [];
    propiedades.forEach(function (propiedad, index) {
      importeP = importeP + propiedad.valor;
      labelsP.push(propiedad.categoria);
      importesP.push(propiedad.valor);

    });
    setImportePropiedades(importeP);
    setLabelsPropiedades(labelsP);
    setImportesPropiedades(importesP)

  };

  useEffect(() => {
    if(importePropiedades !== -1 && importeFacturas !== -1){
      setData2({
        labels: ["Facturas", "Propiedades"],
        datasets: [
          {
            label: "Registros",
            backgroundColor: "rgb(120, 120, 120)",
            borderColor: "black",
            borderWith: 1,
            hoverBackgroundColor: "rgb(180, 180, 180)",
            hoverBorderColor: "#FF0000",
            data: [importeFacturas, importePropiedades],
          },
        ],
      });
    }
    
  }, [importeFacturas, importePropiedades]);
  
  const opciones = {
    maintainAspectRadio: false,
    responsive: true,
  };
  useEffect(() => {
    if(importeFacturas !== -1 && labelsFacturas !== undefined){
      setData3( {
        labels: labelsFacturas,
        datasets: [
          {
            label: "Facturas",
            data: importesFacturas,
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "black",
          },
        ],
      });
    }
  
 }, [importeFacturas, labelsFacturas]);
 useEffect(() => {
  if(importePropiedades !== -1 && labelspropiedades !== undefined){
    setData4( {
      labels: labelspropiedades,
      datasets: [
        {
          label: "Propiedades",
          data: importesPropiedades,
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "black",
        },
      ],
    });
  }

}, [importePropiedades, labelspropiedades]);
  useEffect(() => {
     getFacturas();
     getPropiedades();
     getOtrasIncidencias();
     getIncidencias();
  }, []);

  useEffect(() => {
    if(facturas !== undefined && propiedades !== undefined && incidencias!== undefined && otrasIncidencias !== undefined){

      getAll();
      setData1({
        labels: [
          "Factudras",
          "Propiedades",
          "Incidencias medicas",
          "Otras incidencias",
        ],
        datasets: [
          {
            label: "Registros",
            backgroundColor: "rgb(120, 120, 120)",
            borderColor: "black",
            borderWith: 1,
            hoverBackgroundColor: "rgb(180, 180, 180)",
            hoverBorderColor: "#FF0000",
            data: [
              facturas.length,
              propiedades.length,
              incidencias.length,
              otrasIncidencias.length,
            ],
          },
        ],
      });
    }
  }, [facturas, propiedades, otrasIncidencias, incidencias]);
  
  return (
    <Flex justifyContent="center">
      <Box
        alignContent="center"
        justifyContent="center"
        m="20px"
        w="80%"
        bgGradient="linear(to-r, green.200, green.500)"
        p={4}
        color="black"
        alignItems="center"
        align="center"
        borderRadius="20px"
      >
        <Text fontSize="6xl">Resumen de los datos registrados</Text>
        <Flex justifyContent="center">
          <Box w="30%">
            <Text fontSize="3xl">Numero de registros</Text>
             {data1 !== undefined && <Bar title="aaaa" data={data1} options={opciones} /> }
          </Box>
          <Box w="30%" ml="90px">
            <Text fontSize="3xl">Reparto de gastos</Text>
            {data2 !== undefined &&<Pie data={data2} options={opciones} />}
          </Box>
          <Box w="30%">
            <Text fontSize="3xl">Gastos en facturas</Text>
            {data3 !== undefined &&<Line data={data3} />}
          </Box>
          <Box w="30%">
            <Text fontSize="3xl">Gastos en propiedades</Text>
            {data4 !== undefined &&<Line data={data4} />}
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
