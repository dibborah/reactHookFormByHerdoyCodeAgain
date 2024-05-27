import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from "joi";

interface authFormFields {
  email: string,
  password: string,
}

const schema = Joi.object({
  email: Joi.string().min(5).max(200).required().label('Email'),
  password: Joi.string().min(8).max(100).required().label('Password')
})
 
const App = () => {
  const formMethod = useForm<authFormFields>({
    resolver: joiResolver(schema)
  });
  const onSubmit:SubmitHandler<authFormFields> = (data: any) => {
    console.log(data);
  }
  return (
    <div className="container my-5">
      <form onSubmit={formMethod.handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input {...formMethod.register('email')} type="email" className="form-control" id="email" />
          {formMethod?.formState?.errors?.email && <div className="text-danger"> {formMethod.formState.errors.email.message}</div> }
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input {...formMethod.register('password')} type="password" className="form-control" id="password" />
        </div>
          {formMethod?.formState?.errors?.password && <div className="text-danger"> {formMethod.formState.errors.password.message}</div> }
        <button disabled={!formMethod.formState.isValid} type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default App;