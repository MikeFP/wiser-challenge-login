import styled from "styled-components";
import Head from "next/head";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../components/button";
import { authenticate, logout, reset } from "../stores/auth/auth-store";
import { useSelector, useDispatch } from "react-redux";
import { emailPattern } from "../utils/patterns";

const ViewContainer = styled.div.attrs(() => ({
  className: "flex h-screen flex-col sm:flex-row",
}))``;

const PanelImageContainer = styled.div.attrs(() => ({
  className:
    "relative h-40 -mt-4 xs:h-56 xs:-mt-14 sm:mt-0 sm:h-full sm:w-5/12 md:w-1/2",
}))``;

const Container = styled.div.attrs(() => ({
  className: "md:w-1/2 sm:overflow-auto",
}))``;

const Content = styled.section.attrs(() => ({
  className:
    "md:max-w-xs mt-8 sm:mt-20 md:mt-34 mx-8 sm:mx-10 md:mx-16 lg:mx-24",
}))``;

const HeadTitle = styled.h1.attrs(() => ({
  className: "text-4xl text-primary-700 leading-12",
}))``;

const HeadSubtitle = styled.p.attrs(() => ({
  className: "mt-4 font-semibold text-primary-500",
}))``;

const Field = styled.div.attrs(() => ({
  className: "flex flex-col mb-4",
}))``;

const Label = styled.label.attrs(() => ({
  className: "uppercase text-xs text-primary-700 mb-2",
}))``;

const Input = styled.input.attrs((props) => ({
  className:
    "bg-transparent text-primary-500 text-xs p-4 border border-primary-500 rounded-lg " +
    (props.hasError ? "border-danger" : ""),
}))``;

const InputError = styled.div.attrs((props) => ({
  className: "text-danger mt-2 text-xs " + (!props.show ? "hidden" : ""),
}))``;

export default function Login() {
  const { register, handleSubmit, setValue, errors } = useForm();
  const [dirty, setDirty] = useState(false);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);
  const user = useSelector((state) => state.user);

  const onSubmit = function (data) {
    dispatch(
      authenticate({
        email: data.email,
        password: data.password,
      })
    );
  };

  if (error) {
    window.alert(`Credenciais incorretas :/`);
    dispatch(reset());
  } else if (user) {
    window.alert(`Bem-vindo, ${user.name}!`);
    dispatch(logout());
  }

  return (
    <>
      <Head>
        <title>Wiser - Login</title>
      </Head>
      <ViewContainer>
        <PanelImageContainer>
          <Image
            src="/images/shutterstock.jpg"
            layout="fill"
            className="object-cover object-top sm:object-center"
          />
          <div className="relative bg-gradient-to-t from-primary-900 to-primary-600-opacity-0 h-full z-1" />
        </PanelImageContainer>
        <Container>
          <Content>
            <HeadTitle>
              Olá, seja <br className="d-none lg:d-inline" /> bem-vindo!
            </HeadTitle>
            <HeadSubtitle>
              Para acessar a plataforma, faça seu login.
            </HeadSubtitle>
            <form
              className="mt-11 flex flex-col"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Field>
                <Label htmlFor="email-input">E-mail</Label>
                <Input
                  id="email-input"
                  placeholder="user.name@mail.com"
                  name="email"
                  hasError={dirty && errors.email}
                  ref={register({
                    required: "Este campo é obrigatório",
                    pattern: {
                      value: emailPattern,
                      message: "Digite um e-mail válido",
                    },
                  })}
                  onChange={(e) =>
                    setValue("email", e.target.value, { shouldValidate: true })
                  }
                />
                <InputError show={dirty && errors.email}>
                  {errors.email?.message}
                </InputError>
              </Field>
              <Field>
                <Label htmlFor="password-input">Senha</Label>
                <Input
                  id="password-input"
                  placeholder="************"
                  type="password"
                  name="password"
                  hasError={dirty && errors.password}
                  ref={register({ required: "Este campo é obrigatório" })}
                  onChange={(e) => setValue("password", e.target.value)}
                />
                <InputError show={dirty && errors.password}>
                  {errors.password?.message}
                </InputError>
              </Field>
              <Button
                className="mt-2"
                type="submit"
                onClick={() => {
                  setDirty(true);
                }}
                disabled={loading}
              >
                Entrar
              </Button>
            </form>
            <p className="mt-8 text-sm text-center text-primary-500 mb-20 lg:mb-12">
              Esqueceu seu login ou senha? Clique{" "}
              <span className="text-primary-600 underline">
                <a href="#">aqui</a>
              </span>
            </p>
          </Content>
        </Container>
      </ViewContainer>
    </>
  );
}
