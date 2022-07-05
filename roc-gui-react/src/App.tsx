import React, {useState} from 'react';
import './App.css';

interface modelField {
    name: string
    description?: string
    type: "string" | "number"
    maxLength?: number
    minLength?: number
    title: string
    required?: boolean
}

interface modelDef {
    name: string
    description: string
    fields: modelField[]
}

type IProps = {}

function App(props: IProps) {

    // NOTE this has be computed from openApi
    const modelDef: modelDef = {
        name: "Swtich",
        description: "A managed device in the fabric (single)",
        fields: [
            {
                name: "display-name",
                type: "string",
                title: "Display Name"
            },
            {
                name: "model-id",
                type: "string",
                title: "Model Id",
                required: true,
                description: "link to switch model"
            }
        ]
    }

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

    return <div>
        <h1>Form generation example:</h1>
        <form onSubmit={handleSubmit}>
            {modelDef.fields.map((f, i) => {
                return (
                    <div className="row mt-2" key={i}>
                        <div className="col-xs-12">
                            <div
                                 className={`form-group ${f.required ? "required" : ""}`}>
                                <label htmlFor={f.name} className="form-label">
                                    {f.title}
                                </label>
                                <input
                                    className="form-control"
                                    name={f.name}
                                    placeholder={f.name}
                                    onChange={handleChange}
                                    type="text"/>
                            </div>
                        </div>
                    </div>
                )
            })}
            <div className="col-xs-12 mt-2">
                <button type="submit" className="btn btn-primary mb-3" disabled={false}>Save</button>
            </div>
        </form>
        <div className="row mt-5">
            <div className="col-xs-12">
                <div className="card">
                    <div className="card-header">
                        Model definition<br/>
                        <i>Coming from openapi specs</i>
                    </div>
                    <div className="card-body">
                        <code>
                            <pre>{JSON.stringify(modelDef, null, 2)}</pre>
                        </code>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default App;
