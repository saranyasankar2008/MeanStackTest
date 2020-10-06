import express, { Request, Response } from "express";
import cors from "cors";
const app = express()

app.use(cors());
const parseConfig = {
	firstName:8,
	lastName:10,
	clientId:''
}
const parsestrInfo = (obj,parseTrim=false) => {
	let resultObj = {};
	let startPoint = 0;
	for (let [key, value] of Object.entries(parseConfig)) {
		resultObj[key] = value ? obj.substr(startPoint,value) : obj.substr(startPoint,);	
		if(parseTrim){
			resultObj[key] = resultObj[key].replace(/0+$/, '');
		}
		startPoint = +startPoint + +value;
	}
	return resultObj;
}
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World!");
})
app.post("/api/v1/parse", (req: Request, res: Response) => {
	if(req.query.data){
		const result = parsestrInfo(req.query.data);
		res.status(200).send(result);
	}else{
		res.status(400).send("Invalid Params");
	}
  
})
app.post("/api/v2/parse", (req, res) => {
  if(req.query.data){
		const result = parsestrInfo(req.query.data,true)
		res.status(200).send(result);
	}else{
		res.status(400).send("Invalid Params");
	}
})

app.listen(8000,()=>{
  console.log('Server Started at Port, 8000')
})