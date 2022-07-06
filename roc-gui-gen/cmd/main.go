package main

import (
	"fmt"
	"github.com/getkin/kin-openapi/openapi3"
	t "github.com/teone/roc-gui-gen/pkg/template"
	"golang.org/x/text/cases"
	"golang.org/x/text/language"
	"io"
	"os"
	"path"
	"strings"
	"text/template"
)

const objectType = "object"
const templateFile = "form.go.tpl"

type FieldType int

const (
	Unknown FieldType = iota
	String            = 1
	Number            = 2
)

func (f FieldType) fromString(s string) (FieldType, error) {
	switch s {
	case "string":
		return String, nil
	case "number":
		return Number, nil
	default:
		return Unknown, fmt.Errorf("cannot convert %s to FieldType", s)
	}
}

func (f FieldType) String() string {
	switch f {
	case String:
		return "string"
	case Number:
		return "number"
	default:
		return "unknown"
	}
}

type ModelField struct {
	Name        string
	Description string
	FieldType   FieldType
	Title       string
	Required    bool
}

//.NOTE it might be worthy to directly pass the openapi.Schema to the template
type ModelDef struct {
	Name        string
	Description string
	Fields      []ModelField
}

func (m ModelDef) String() string {
	s := fmt.Sprintf("%s[", m.Name)
	for i, f := range m.Fields {
		s += fmt.Sprintf("%s=%s", f.Name, f.FieldType)
		if i < (len(m.Fields) - 1) {
			s += ","
		}
	}
	s += "]"
	return s
}

func main() {
	cwd, _ := os.Getwd()
	doc, err := openapi3.NewLoader().LoadFromFile(path.Join(cwd, "./openapi/simple.yaml"))
	if err != nil {
		panic(err)
	}

	modelDef, err := getModelsSpecs(doc)
	if err != nil {
		panic(err)
	}

	file, err := os.Create("index.html")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	err = applyTemplate(file, modelDef)
	if err != nil {
		panic(err)
	}
}

// parse an API File an return a ModelDef element
func getModelsSpecs(specs *openapi3.T) ([]*ModelDef, error) {

	defs := []*ModelDef{}
	for _, v := range specs.Components.Schemas {
		// we only care about the containers, we don't need to generate forms for leaves
		if v.Value.Type == objectType {
			d, err := getModelSpec(v.Value)
			if err != nil {
				return nil, err
			}
			defs = append(defs, d)
		}
	}
	return defs, nil
}

func getModelSpec(schema *openapi3.Schema) (*ModelDef, error) {
	m := &ModelDef{
		Name:        schema.Title,
		Description: schema.Description,
		Fields:      nil,
	}
	for k, v := range schema.Properties {
		t, err := FieldType.fromString(Unknown, v.Value.Type)
		if err != nil {
			return nil, err
		}
		f := ModelField{
			Name:        k,
			Description: v.Value.Description,
			FieldType:   t,
			Title:       v.Value.Title,
			Required:    !v.Value.Nullable, // might need to consider if AllowEmptyValue matters
		}
		m.Fields = append(m.Fields, f)
	}
	return m, nil
}

func applyTemplate(output io.Writer, models []*ModelDef) error {
	var funcs template.FuncMap = map[string]interface{}{
		"quote": func(value interface{}) string {
			return fmt.Sprintf("\"%s\"", value)
		},
		"replace": func(search, replace string, value interface{}) string {
			return strings.ReplaceAll(fmt.Sprint(value), search, replace)
		},
		"capitalize": func(s string) string {
			caser := cases.Title(language.English)
			return caser.String(s)
		},
		"sanitize": func(s string) string {
			// replace all characters which are not valid in function names,
			// will be extended as needed
			return strings.ReplaceAll(s, "-", "")
		},
	}

	t, err := template.New(templateFile).
		Funcs(funcs).
		ParseFS(t.RocGuiTemplate, "*.go.tpl")
	if err != nil {
		return err
	}

	return t.Execute(output, models)
}
