import { zodResolver } from '@hookform/resolvers/zod';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { INVALID_EMAIL, REQUIRED_FIELD } from '../../shared/zod/errors';

const signUpForm = z.object({
  restaurantName: z
    .string({
      required_error: REQUIRED_FIELD,
    })
    .min(3, 'Nome do estabelecimento muito curto'),
  managerName: z
    .string({
      required_error: REQUIRED_FIELD,
    })
    .min(3, 'Nome do gerente muito curto'),
  phone: z
    .string({
      required_error: REQUIRED_FIELD,
    })
    .min(11, 'Número de celular inválido'),
  email: z
    .string({
      required_error: REQUIRED_FIELD,
    })
    .email(INVALID_EMAIL),
});

type SignUpForm = z.infer<typeof signUpForm>;

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  });

  const navigate = useNavigate();

  async function handleSignUp(data: SignUpForm) {
    console.log(data);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success('Restaurante cadastrado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => navigate('/sign-in'),
        },
      });
    } catch {
      throw new Error('Erro ao cadastrar restaurante.');
    }
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>
        <div className="w-[350px] flex flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-light">Criar conta grátis</h1>
            <p className="text-sm text-muted-foreground">Seja um parceiro e comece suas vendas!</p>
          </div>

          <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input id="restaurantName" type="text" {...register('restaurantName')} />
              {errors.restaurantName && (
                <p className="text-sm text-red-500">{errors.restaurantName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input id="managerName" type="text" {...register('managerName')} />
              {errors.managerName && (
                <p className="text-sm text-red-500">{errors.managerName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input id="phone" type="tel" {...register('phone')} />
              {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
            </div>

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Finalizar cadastro
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos <a href="">Termos de seviço</a> e{' '}
              <a className="underline underline-offset-4" href="">
                políticas de privacidade
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
