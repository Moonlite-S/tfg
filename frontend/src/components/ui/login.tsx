import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
import { Label } from "./label";
import { login } from "@/features/login/api/login";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
})

type LoginFormData = z.infer<typeof loginSchema>

/**
 * Login Component
 */
export function LoginForm() {
  const navigate = useNavigate()
  const { 
    register, 
    handleSubmit, 
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data)
      if (response.status === 200) {
        navigate("/dashboard")
      }
    } catch (error) {
      setError("root", { message: error instanceof Error ? error.message : "An error occurred during login"})
    }
  }

  return (
    <div className='m-5'>

      <h2 className='px-3 text-xl md:text-2xl'>Existing User? Login Here:</h2>

      <form onSubmit={handleSubmit(onSubmit)} className='p-3'>

        <div className='flex flex-col gap-2'>

          <Label htmlFor="email">Email</Label>
          <Input type="email" {...register("email")} placeholder="example@example.com" />
          {errors.email && <p className='text-red-500'>{errors.email.message}</p>}

          <Label htmlFor="password">Password</Label>
          <Input type="password" {...register("password")} placeholder="********" />
          {errors.password && <p className='text-red-500'>{errors.password.message}</p>}

        </div>

        <Button type="submit" className="w-full mt-4">
          Log In
        </Button>
        {errors.root && <p className='mt-3 text-red-500'>{errors.root.message}</p>}

      </form>

      <div className='flex flex-row items-center justify-center my-4'>
              <div className='w-full border-2' />
              <div className='mx-3 text-center'>OR</div>
              <div className='w-full border-2' />
            </div>
      
            <button data-testid='microsoft_login' className='flex flex-row items-center justify-center p-3 transition-all duration-300 border rounded-md group hover:shadow-md'>
              <div className='text-center '>Log in with Microsoft</div>
            </button>
    </div>
  )
}
