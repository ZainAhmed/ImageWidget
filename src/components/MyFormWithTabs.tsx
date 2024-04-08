import React, { useState } from "react";
import Form from "@rjsf/material-ui";
import { UiSchema } from "@rjsf/core";
import { JSONSchema7 } from "json-schema";
type PropsType ={
    schema:JSONSchema7;
    uiSchema:UiSchema
}

export const tabs = [
  { key: "Contentfield", label: "Content" },
  { key: "Styles", label: "Styles" },
  { key: "Advanced", label: "Advanced" },
];
  
  const MyFormWithTabs = (props:PropsType) => {
    const {schema,uiSchema} = props
    const [formState,setFormState]= useState({Contentfield:{},Styles:{},Advanced:{}})
    const [activeTab, setActiveTab] = useState(tabs[0].key);
  
    const getSchemaForActiveTab = () => {
      return {
        type: "object",
        properties: {
          [activeTab]: schema.properties[activeTab],
        },
      };
    };

    const updateWidget = () => {
        const el = document.querySelector("#preview > :first-child");
        for (const key in formState) {
            const childData = formState[key]
            for (const childKey in childData) {
              el?.setAttribute(childKey, childData[childKey]); 
            }
        }
      };

      const handleChange= (e:any) =>{
        const newData =e?.formData[activeTab]
        const oldData = e?.schema?.properties[activeTab]?.properties
        if(newData){
          setFormState({...formState,[activeTab]:newData})
          Object.keys(newData).forEach((key)=>{
            if(newData[key] !== undefined){
                oldData[key].default = newData[key]
            }
          })
        }
      }
  
    return (
      <div>
        <div style={{ marginBottom: "20px",display:"flex" }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                marginRight: "10px",
                fontWeight: activeTab === tab.key ? "bold" : "normal",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <Form
          schema={getSchemaForActiveTab()}
          uiSchema={uiSchema}
          onChange={(e)=>handleChange(e)}
              onSubmit={() => {
      updateWidget();
    }}
        />
      </div>
    );
  };
  
  export default MyFormWithTabs;
  