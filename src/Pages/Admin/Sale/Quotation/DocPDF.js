//yarn add @react-pdf/renderer
import React from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import dentilux from "../../../../img/dentilux.png"

/*
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import DocPDF from "./DocPDF";

const [information, setinformation] = React.useState("");
const [verPDF] = React.useState(false);
const Menu = () => (
        <div>
          <PDFDownloadLink
            document={<DocPDF information={information} />}
            <Button variant="info">Imprimir</Button>
          </PDFDownloadLink>
        </div>
      );

 //return     
<div style={{ minHeight: "100vh" }}>
      <Menu />
      {information ? (
        <> 
          {verPDF ? (
            <PDFViewer style={{ width: "100%", height: "90vh" }}>
              <DocPDF information={information} />
            </PDFViewer>
          ) : null}</>) : null}
    </div>
*/

const DocPDF = ({ information }) => {
  const title = "Cotización";
  return (
    <Document>
      <Page size="A4" style={{ 
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft:60,
        paddingRight:60,
        lineHeight: 1.5,
        flexDirection: 'column', }}>
        {/* Imagen */}
        <Image style={{
          marginLeft: 'auto',
          marginRight: 'auto'}} src={dentilux} />
        {/* Title */}       
        <View style={{
          flexDirection: 'row',
          marginTop: 24,}}>
          <Text style={{
            color: '#61dafb',
            letterSpacing: 4,
            fontSize: 25,
            textAlign: 'center',
            textTransform: 'uppercase',}}>{title}</Text>
        </View>
        {/* Date */}
        <View style={{ 
          flexDirection: 'row',
          marginTop: 36,
          justifyContent: 'flex-end'}}>
          <Text style={{width: 60}}>Fecha: {information ? information.createDate : null}</Text>
          <Text style={{fontSize: 12,}}>Llave: {information ? information.key : null}</Text>  
        </View >

        <View style={{ 
          flexDirection: 'row',
          marginTop: '',
          justifyContent: 'flex-end'}}>
          <Text style={{width: 60}}>Tipo: {information ? information.type : null}</Text>
          <Text style={{fontSize: 12,}}>Status: {information ? information.status : null}</Text>  
        </View >
        {/* Customer */}
        <View style={{marginTop: 36, marginBottom: 40}}>
          <Text style={{marginTop: 20,
            paddingBottom: 3,
            fontFamily: 'Helvetica-Oblique'}}>Cliente: </Text>
          <Text>{information ? information.customer : null}</Text>
        </View>
        {/* Table */}
        
        <View style={{
          flexDirection: 'row',
          borderBottomColor: '#bff0fd',
          borderBottomWidth: 1,
          alignItems: 'center',
          textAlign: 'center',
          height: 24,
          fontStyle: 'bold',}}>
          <Text style={{width: '60%',
        borderRightWidth: 1, borderRightColor: '#bff0fd'}}>Descripción</Text>
          <Text style={{width: '10%',
        borderRightWidth: 1, borderRightColor: '#bff0fd'}}>Cantidad</Text>
          <Text style={{width: '15%',
        borderRightWidth: 1, borderRightColor: '#bff0fd'}}>Descuento</Text>
          <Text style={{width: '15%'}}>Total</Text>
        </View>

        <View style={{flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        textAlign: 'center',
        height: 24,
        fontStyle: 'bold',}} >
            <Text style={{width: '60%',
        textAlign: 'left',
        borderRightColor: '#90e5fc',
        borderRightWidth: 1,
        paddingLeft: 8,}}>{information ? information.description : 'Description example'}</Text>
            <Text style={{width: '10%',
        borderRightColor: '#90e5fc',
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,}}>1</Text>
            <Text style={{width: '15%',
        borderRightColor: '#90e5fc',
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,}}>{information ? information.discoutAmount : null}</Text>
            <Text style={{width: '15%',
        textAlign: 'right',
        paddingRight: 8,}}>{information ? information.total : null}</Text>
        </View>

        {/* Bye */}
        <View style={{
          marginTop: 20}}>
          <Text style={{fontSize: 12,
            textAlign: 'center'}}>Vendedor: {information ? information.vendedor : null}</Text>
          <Text style={{fontSize: 12,
            textAlign: 'center'}}>Fecha de actualización: {information ? information.updateDate : null}</Text>
          <Text style={{fontSize: 12,
            textAlign: 'center',}}>Sucursal: {information ? information.store : null}</Text>
          <Text style={{fontSize: 12,
            textAlign: 'center',
            }}>Numero de sucursal: {information ? information.storeNumber : null}</Text>
        </View>

      </Page>
    </Document>
  );
};

export default DocPDF;