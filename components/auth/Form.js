
import PropTypes from 'prop-types'
import Link from 'next/link'
import React,{ useState } from 'react';


const Form = ({ errorMessage, onSubmit,onChange=f=>f,load=false }) => {
  
  const [account, setAccount] = useState('User');



 
  
  return (
  	<div id="bg-img" >
  <div className=" login-wrap d-flex align-items-center flex-wrap justify-content-center" >
		<div className="container">
			<div className="row align-items-center justify-content-center">


			

				<div className="col-sm-12 col-md-6 col-lg-5">
					<div className="login-box box-shadow border-radius-10 bg-white">
						<div className="login-titl">
						<p className="text-success text-center">Find dates, friends </p>
							<h3 className="text-center text-black">
							Sign in to cite.com</h3>
						</div>
						<hr/>

						<form className="pt-3">
			

{errorMessage && <div className="alert alert-danger" role="alert"> {errorMessage} </div> }
              

							<div className="input-group custom">
								<input type="text" className="form-control form-control-lg" name="username" placeholder="Username ie. adele21" onChange={onChange} />
								<div className="input-group-append custom">
									<span className="input-group-text"><i className="icon-copy dw dw-user1"></i></span>
								</div>
							</div>
							<div className="input-group custom">
								<input type="password" name="password" className="form-control form-control-lg" placeholder="**********" onChange={onChange} />
								<div className="input-group-append custom">
									<span className="input-group-text"><i className="dw dw-padlock1"></i></span>
								</div>
							</div>
							<div className="row pb-30">
								<div className="col-6">
									<div className="custom-control custom-checkbox">
										<input type="checkbox" className="custom-control-input" id="customCheck1"/>
										<label className="custom-control-label" for="customCheck1">Remember</label>
									</div>
								</div>
								<div className="col-6">
									<div className="forgot-password"><a href="forgot-password.html">Forgot Password</a></div>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-12">
									<div className="input-group mb-0">
										{/* <!--
											use code for form submit
											<input className="btn btn-primary btn-lg btn-block" type="submit" value="Sign In"/>
										--> */}
										<a className="btn btn-primary btn-lg btn-block text-white" onClick={onSubmit}>Sign In 
										{load &&	
											 <span className="spinner-grow spinner-grow-sm mx-4" role="status" >
												 </span>}</a>
									</div>
									<div className="font-16 weight-600 pt-10 pb-10 text-center" data-color="#707373">OR</div>
									<div className="input-group mb-0">
                    <Link href="/register">
										<a className="btn btn-dark btn-lg btn-block" href="/register">
                      New to Cite ? Create Account</a>
                      </Link>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>

)
                  }

export default Form

Form.propTypes = {
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func,
}
