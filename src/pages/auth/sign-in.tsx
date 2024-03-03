import { zodResolver } from '@hookform/resolvers/zod';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { INVALID_EMAIL, REQUIRED_FIELD } from '../../shared/zod/errors';

const signInForm = z.object({
  email: z
    .string({
      required_error: REQUIRED_FIELD,
    })
    .email(INVALID_EMAIL),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  });

  async function handleSignIn(data: SignInForm) {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success('Enviamos um link de autenticação para seu email');
    // toast.success('Enviamos um link de autenticação para seu email', {
    //   action: {
    //     label: 'Acessar',
    //     onClick: () => handleSignIn(data),
    //   },
    // })
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-up">Novo estabelecimento</Link>
        </Button>
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-light">Acessar painel</h1>
            <p className="text-sm text-muted-foreground">
              Acompanhe suas vendas pelo painel do parceiro
            </p>
          </div>

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Acessar
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
