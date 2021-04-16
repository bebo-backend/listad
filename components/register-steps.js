
import PropTypes from 'prop-types'
import Link from 'next/link'
import React,{ useState } from 'react';
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import gistfile1 from './contrib/gistfile1'
import sha1 from 'crypto-js/sha1'
import Dropzone from 'react-dropzone-uploader'
import axios from 'axios'
import { useRouter } from 'next/router'




export const Step1 = ({setStep=f=>f,username="_"}) => {
  
  const [form, setForm] = useState({age:new Date()});

  const [load, setLoad] = useState(false)


const option = (value)=>{

	return <option value={value} key={value}>{value}</option>
}

const hobbies =["Soccer","Reading","Writing","Movies","Hiking"]
const interests =["Friendship","Dates","One Night Stand","Relationship","Marriage"]
const truth =["Married","Not Married","Divorce"]
const employments =["Programmer","Web designer","Engineer","Students"]

const getAddress = ()=>{

let data= []

Object.values(gistfile1).map(
val => {


Object.values(val.state.locals).map((city,index)=>(

   data = [...data, {value:val.state.name+' - '+city.name,label:val.state.name+' - '+city.name}]

))


})

	return data
}

const onMultiSelect = (value,name)=>{
let val;
if (value) {

val = value.map(e=>e.value)
	console.log(val)

}


setForm({
	...form,[name]:val
})

}

const selectOnChange = (value,name)=>{

	let val = {[name]:value.value??value}

console.log(val)



setForm({...form,[name]:value.value??value})

}



  async function onChange(e){

  	console.log(e.target.value)

const data = {
    ...form,
    [e.target.name]:e.target.value
}

setForm(data)

  }


const onSubmit =  async (e)=>{


console.log('on Submit')

setLoad(true)




  try {

    const res = await axios.post('/api/auth/register-step1', {...form,username})


if(res.data){

  setLoad(false)
}

if (res.data.ok) {
   
   setStep(1)
   
    }
   

  } catch (error) {

    setLoad(false)
    console.log(error)


  }

}


 
  
  return (
  <div className=" login-wrap d-flex align-items-center flex-wrap justify-content-center">
		<div className="container">




			<div class="mb-30 mx-4 ">
					<div class="card-box height-100-p widget-style1 w-100">
						<div class="d-flex flex-wrap align-items-center py-4 w-100">
							

							<div class="progress-data ">
							<div class="progress progress-ui mx-4 " >
								<div class="progress-bar dial1  " role="progressbar" style={{width:'55%'}}
								 aria-valuenow="55"  >55%</div>
							</div>
							</div>


							<div class="widget-data " style={{paddingLeft:'60px'}}>
								<div class="h4 mb-0 mb-2">Complete your registration...</div>
								<div class=" font-14 text-muted">Update your personal information</div>
							</div>
						</div>



					</div>

						<div className="p-4 bg-white box-shadow border-radius-10 my-4 w-100">
						<div className="login-title">
	
									<h4 className=" text-black row">
							<span className="col-lg-10 col-sm-9"> Personal information</span>
						
							<span className="col-lg-2 col-sm-3 text-right  " > 

							<div className="row">
							<span className="bg-info text-center font-14 col-3 py-2 px-1 text-white "
							 style={{borderRadius:'1000px'}}> 1 </span> 
			<span className=" text-center   font-16 mx-4 mt-2"> of </span> 


										<span className="bg-success text-center font-14 col-3 py-2 px-1 text-white "
							 style={{borderRadius:'1000px'}}> 2 </span> 

							 </div>
							 
							  </span>

							</h4>
						</div>

						<hr />

						<form className="my-4" style={{paddingTop:'20px'}} >

<div className="form-group row">

<div className="col-sm-12 col-md-2 text-lg weight-600 pt-2 mb-2" >
Gender:
</div>
<Select className="col-sm-12 col-md-10" options={["Male","Female","Other"].map(
val => ({value:val,label:val}))}   name="sex" 
onChange={value=>selectOnChange(value,'sex')}
>




  </Select>

</div>


<div className="form-group row">

<div className="col-sm-12 col-md-2 text-lg weight-600 pt-2 mb-2" >
Date of birth:
</div>
	<div class="col-sm-12 col-md-10">
<input class="form-control datetimepicker" name="age" value={form.age} onChange={onChange}  type="date" />
							</div>

</div>


<div className="form-group row">

<div className="col-sm-12 col-md-2 text-lg weight-600 pt-2 mb-2" >
Location:
</div>
	<div class="col-sm-12 col-md-10">

	<div className="row">

	<Select className="col-sm-12 col-md-6 mb-2"  isSearchable options={getAddress()} 
	 name="location" 
onChange={value=>selectOnChange(value,'location')} placeholder='Select Location...'
>  </Select>

<div className="input-group custom col-sm-12 col-md-6 ">
<input type="text" className="form-control " name="street"
 onChange={onChange} placeholder=" Street address" />
<div className="input-group-append custom">
<span className="input-group-text pr-4"><i className="icon-copy dw dw-pin text-dark font-weight-bold"></i></span>
</div>
</div>




</div>
</div>

</div>





<div className="form-group row">

<div className="col-sm-12 col-md-2 text-lg weight-600 pt-2 mb-2" >
Sexual Orientation:
</div>


<Select className="col-sm-12 col-md-10" options={["Straight","Gay","Lesbian","Other"].map(
val => ({value:val,label:val}))}  name="sexual_orientation" 
onChange={value=>selectOnChange(value,'sexual_orientation')} placeholder="Select orientation..."
>




  </Select>


</div>




<div className="form-group row">

<div className="col-sm-12 col-md-2 text-lg weight-600 pt-2 mb-2" >
Hobbies:
</div>


<Select isMulti isSearchable className="col-sm-12 col-md-10" options={hobbies.map(
val => ({value:val,label:val}))}   name="hobbies" 
onChange={value=>onMultiSelect(value,'hobbies')} placeholder="Select your hobby..."
>




  </Select>


</div>

<div className="form-group row">

<div className="col-sm-12 col-md-2 text-lg weight-600 pt-2 mb-2" >
Marriage Options:
</div>


<Select  isSearchable className="col-sm-12 col-md-10" options={truth.map(
val => ({value:val,label:val}))}   name="marriage" 
onChange={value=>selectOnChange(value,'marriage')} 
>




  </Select>


</div>


<div className="form-group row">

<div className="col-sm-12 col-md-2 text-lg weight-600 pt-2 mb-2" >
Looking for:
</div>


<Select isMulti isSearchable className="col-sm-12 col-md-10" options={interests.map(
val => ({value:val,label:val}))}  name="interests" placeholder="What you're looking for"
onChange={value=>onMultiSelect(value,'interests')} 
>




  </Select>


</div>



<div className="form-group row">

<div className="col-sm-12 col-md-2 text-lg weight-600 pt-2 mb-2" >
Employments:
</div>


<Select isMulti isSearchable className="col-sm-12 col-md-10" options={employments.map(
val => ({value:val,label:val}))}   name="employments" placeholder="Select employments..."
onChange={value=>onMultiSelect(value,'employments')} 
>




  </Select>


</div>





<p className="text-info mt-4 pt-4">
<hr />
<span className="weight-600">Note</span>: Verify that your provided data is accurate
</p>

<div className="text-center pt-3">

<span className="btn btn-success mr-4 py-2" onClick={e=>setStep(1)} style={{width:'130px'}}>

Skip
</span>
<span className="btn btn-primary py-2 " onClick={onSubmit} style={{minWidth:'130px'}}>

Update 	{load && <span className="spinner-border spinner-border-sm mx-4" role="status" >
												 </span>}
</span>

</div>


						</form>

				</div>
				</div>


		</div>
	</div>

)
                  }







export const CloudinaryUpload = ({title="demo",setImageId=f=>f,removeImageId=f=>f,maxLength=10,multiple=true, finishUpload})=>{


const [public_id,setPublicId] = useState("")


const SignKey = (eager,public_id,timestamp)=>{

const api_secret = "fDWINmYw_Q4v3xN86uOFKIq2Phw"

const eag = `eager=${eager}`
const pub_id = "public_id="+public_id
const timestm = "timestamp="+timestamp

const params = `${eag}&${pub_id}&${timestm}`

const hash = sha1(params+api_secret).toString()

console.log(hash)

	return hash
}


const getUploadParams= ()=>{

// const url = "http://localhost:3000/api/submitp" 
const api_key="634365759713568",timestamp=Math.floor(new Date().getTime()/1000),eager="q_auto:good"
const signature=SignKey(eager,public_id,timestamp)

const url = "https://api.cloudinary.com/v1_1/bebo-vercel/image/upload"

	return {fields:{public_id,api_key,timestamp,eager,signature},
		url
	}
}

const handleChangeStatus = ({meta,file},status)=>{


const metaName = meta.name.replace(".jpg","").replace(".png","").replace(" ","_")

const titleName= title.replace(' ',"_")



if (status === 'headers_received'){

if (finishUpload) finishUpload(titleName+"_"+metaName)

// console.log("picture uploaded")
}

if (status === 'preparing'){

setPublicId(titleName+"_"+metaName)

}

if (status === "getting_upload_params"){

setImageId(titleName+"_"+metaName)

// if (finishUpload) finishUpload(titleName+"_"+metaName)

}

if (status === "removed"){

removeImageId(titleName+"_"+metaName)

}
	// console.log(meta)
	
	console.log(status)
}

// const handleSubmit = ({files,allFiles})=>{

// console.log(files.map(f=>f.meta))
// allFiles.forEach(f=> f.remove())

// }

	return (

	<div>

<Dropzone 
getUploadParams={getUploadParams}
onSubmit={null}
onChangeStatus={handleChangeStatus}
multiple={multiple}
maxFiles={maxLength}
accept={"image/*"}
styles={{dropzone:{
	overflow:'hidden',minHeight:'200px',
	border:'0px solid'
},
 dropzoneReject: { borderColor: 'red', backgroundColor: '#DAA' },
 inputLabel:(files,extra)=>(extra.reject ? {color:'red'}:{})

 }} 
inputContent= {(files,extra)=>{

	return extra.reject ? <p className="w-100 text-center">
	<i className="icon-copy dw dw-warning text-center  " style={{
		fontWeight:'bold',fontSize:'45px'
	}}></i><p className="my-2">Upload Image files only</p>
	</p>
	:<p className="w-100 text-center">
	<i className="icon-copy dw dw-upload text-center dropzone-detail " style={{
		fontWeight:'bold',fontSize:'45px'
	}}></i><p className="my-2 dropzone-detail">Drag File or Click to Browse</p>
	</p>
}}

inputWithFilesContent={files=> <p className="pt-2 text-uppercase"> <i className="icon-copy dw dw-add mx-2 font-weight-bold"></i> Add Picture </p>}

 />

	</div>)
}





export const Step2 = ({setStep=f=>f ,username="_"}) => {


const router = useRouter()
const [files, setFiles] = useState([])
const [load, setLoad] = useState(false)


  
 const onSubmit=  async ()=>{

  setLoad(true)

console.log(load)

  try {

    const res = await axios.post('/api/auth/register-step2', {username,images_id:files})

if(res.data){
  setLoad(false)
}
    
if (res.data.success) {
   
   router.push('/registration-success')
   
    }
   

  } catch (error) {

    setLoad(false)


  }


  }

const setImageId = async (value)=>{



// setFiles([...files,value])
setFiles(value)

// console.log('image files == ',files)


}


const removeImageId = async (value)=>{



// const data = files.filter(file=> file!==value)

// setFiles(data)

// console.log('remove files == ',files)

setFiles("")


}
 
  
  return (
  <div className=" login-wrap d-flex align-items-center flex-wrap justify-content-center">
		<div className="container">




			<div class="mb-30 mx-4 ">
					<div class="card-box height-100-p widget-style1 w-100">
						<div class="d-flex flex-wrap align-items-center py-4 w-100">
							

							<div class="progress-data ">
							<div class="progress progress-ui mx-4  " >
								<div class="progress-bar dial1 bg-success  " role="progressbar" style={{width:'80%'}}
								 aria-valuenow="80"  >80%</div>
							</div>
							</div>


							<div class="widget-data " style={{paddingLeft:'60px'}}>
								<div class="h4 mb-0 mb-2">Complete your registration...</div>
								<div class=" font-14 text-muted">Update profile picture to get more response</div>
							</div>
						</div>



					</div>

						<div className="p-4 bg-white box-shadow border-radius-10 my-4 w-100">
						<div className="login-title">
	
							<h4 className=" text-black row">
							<span className="col-lg-10 col-sm-9"> Profile picture </span>
							<span className="col-lg-2 col-sm-3 text-right  " > 

							<div className="row">
							<span className="bg-info text-center font-14 col-3 py-2 px-1 text-white "
							 style={{borderRadius:'1000px'}}> 2 </span> 
			<span className=" text-center   font-16 mx-4 mt-2"> of </span> 


										<span className="bg-primary text-center font-14 col-3 py-2 px-1 text-white "
							 style={{borderRadius:'1000px'}}> 2 </span> 

							 </div>
							 
							  </span>

							</h4>
						</div>

						<hr />

						<form className="my-4" style={{paddingTop:'20px'}} >

<CloudinaryUpload title={username} setImageId={setImageId} removeImageId={removeImageId} multiple={false} maxLength={1}  />

<hr />
<div className="text-center pt-3">

<span className="btn btn-success mr-4 py-2" onClick={e=>router.push('/')} style={{width:'130px'}}>

Skip
</span>
<span className="btn btn-primary py-2 " onClick={e=>onSubmit()} style={{minWidth:'130px'}}>

Finish Upload 	{load && <span className="spinner-border spinner-border-sm mx-4" role="status" >
												 </span>}
</span>

</div>

						</form>

				</div>
				</div>


		</div>
	</div>

)
                  }




   