# ROC GUI EXPERIMENTS

This repo contains 3 experiments for the autogenerated ROC UI:
- (`roc-gui-gen`)[./roc-gui-gen] contains an example of code generation
- (`roc-gui-ng`)[./roc-gui-ng] contains an example of adaptive UI based on Angular
- (`roc-gui-gen`)[./roc-gui-gen] contains an example of adaptive UI based on ReactJs

> NOTE that all three projects are very very basic and only intended as examples,
> they are nowhere near being useful and may differ from final implementations quite a bit

## ROC GUI GEN

This is a `golang` project, you can generate and view the code with: 
```shell
cd
go mod download
go run cmd/main.go
open index.html
```

> At the moment this project does not generate any javascript code that will be required for it to work.

You can run the project tests with
```shell
go test ./...
```

## ROC GUI NG

This is an `Angular.io` application. You can see it with:

```shell
 cd roc-gui-ng/
 npm install
 npm start
```

Then open the browser at `http://localhost:4200/`

You can run the project tests with
```shell
npm test
```

## ROC GUI NG

This is an `ReactJs` application. You can see it with:

```shell
 cd roc-gui-react/
 npm install
 npm start
```

The browser will automatically open at `http://localhost:3000/`

You can run the project tests with
```shell
npm test
```
If there are no changes you might need to `Press a to run all tests.`