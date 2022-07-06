{{- /*gotype: github.com/teone/roc-gui-gen/cmd.ModelDef*/ -}}
{{ $modelDef := .}}

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
    <title>ROC GUI</title>
</head>
<body>
<div class="container">
    <h1>Form generation example:</h1>
    {{- range $model := $modelDef -}}
        <h4>{{ $model.Name }}</h4>
        <h6><i>{{ $model.Description}}</i></h6>
        <form>
            {{- range $field := $model.Fields }}
            <div class="row mt-2">
                <div class="col-xs-12">
                    <div class="form-group ">
                        <label for="{{ $field.Name }}" class="form-label">{{ $field.Title }}</label>
                        {{- if eq $field.FieldType 1 }}
                        <input class="form-control" name="{{ $field.Name }}" placeholder="{{ $field.Description }}" type="text">
                        {{- end }}
                    </div>
                </div>
            </div>
            {{- end }}
            <div class="col-xs-12 mt-2">
                <button type="submit" class="btn btn-primary mb-3">Save</button>
            </div>
        </form>
    {{- end}}
</div>
</body>
</html>