package main

import (
	"bytes"
	"fmt"
	"github.com/stretchr/testify/assert"
	"regexp"
	"testing"
)

func Test_applyTemplate(t *testing.T) {
	type args struct {
		models []*ModelDef
	}
	type want struct {
		modelName   string
		inputFields int
	}
	tests := []struct {
		name       string
		args       args
		wantOutput want
		wantErr    bool
	}{
		{
			"simple-model",
			args{models: []*ModelDef{
				{
					Name:        "TestModel",
					Description: "TestDescription",
					Fields: []ModelField{
						{
							Name:        "sample-field",
							Description: "sample field",
							FieldType:   String,
							Title:       "SampleField",
							Required:    false,
						},
					},
				},
			}},
			want{
				modelName:   "TestModel",
				inputFields: 1,
			},
			false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			output := &bytes.Buffer{}
			err := applyTemplate(output, tt.args.models)
			if (err != nil) != tt.wantErr {
				t.Errorf("applyTemplate() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			gotOutput := output.String()

			titleR, _ := regexp.Compile(fmt.Sprintf(".*%s.*", tt.wantOutput.modelName))

			found := titleR.FindString(gotOutput)

			assert.NotEmpty(t, found, "model name not found in template")

			textInputR, _ := regexp.Compile(".*input.*type=\"text\".*")
			inputFound := textInputR.FindAllString(gotOutput, -1)
			assert.Equal(t, tt.wantOutput.inputFields, len(inputFound))
		})
	}
}
