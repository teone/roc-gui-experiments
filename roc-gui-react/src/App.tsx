import React, {useEffect, useState} from 'react';
import './App.css';
import {ModelsSpecs, modelDef} from './services/models-specs';

type IProps = {}

function App(props: IProps) {

    useEffect(() => {
        setModelDefs(ModelsSpecs.getModelsSpecs())
    }, [])

    const [modelDefs, setModelDefs] = useState<modelDef | null>(null)
    const [inputs, setInputs] = useState({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(inputs);
    }

    const buildForm = (modelDefs: modelDef) => (
        <form onSubmit={handleSubmit}>
            {modelDefs.fields.map((f, i) => {
                return (
                    <div className="row mt-2" key={i}>
                        <div className="col-xs-12">
                            <div
                                className={`form-group ${f.required ? "required" : ""}`}>
                                <label htmlFor={f.name} className="form-label">
                                    {f.title}
                                </label>
                                {f.type === "string" ? (
                                    <input
                                        className="form-control"
                                        name={f.name}
                                        placeholder={f.description}
                                        onChange={handleChange}
                                        type="text"/>
                                ) : ""}

                            </div>
                        </div>
                    </div>
                )
            })}
            <div className="col-xs-12 mt-2">
                <button type="submit" className="btn btn-primary mb-3" disabled={false}>Save</button>
            </div>
        </form>
    )

    return <div data-testid="app">
        <h1>Form generation example:</h1>
        {modelDefs != null ? buildForm(modelDefs) : ""}
        <div className="row mt-5">
            <div className="col-xs-12">
                <div className="card">
                    <div className="card-header">
                        Model definition<br/>
                        <i>Coming from openapi specs</i>
                    </div>
                    <div className="card-body">
                        <code>
                            <pre>{JSON.stringify(modelDefs, null, 2)}</pre>
                        </code>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default App;
