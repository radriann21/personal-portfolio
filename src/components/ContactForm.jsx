import { useRef } from "react"
import { Toaster, toast } from "react-hot-toast"

import emailjs from "@emailjs/browser"

export const ContactForm = () => {
  const form = useRef(null)
  
  const handleSendEmail = (evt) => {
    evt.preventDefault()

    emailjs
      .sendForm(import.meta.env.PUBLIC_SERVICE_ID, import.meta.env.PUBLIC_TEMPLATE_ID, form.current, {
        publicKey: import.meta.env.PUBLIC_KEY
      })
      .then(() => {
        toast('Mensaje enviado!', {
          style: {
            border: '1px solid #713200',
            padding: '10px',
          }
        })
      })
      .catch(error => {
        toast.error('Error al enviar' + error, {
          style: {
            border: '1px solid red'
          }
        })
      })
  }

  return (
    <>
      <Toaster />
      <form ref={form} className="flex flex-col space-y-8" onSubmit={handleSendEmail}>
        <section>
          <label className="block text-slate-300 font-bold font-headings" htmlFor="name">Nombre</label>
          <input className="active:outline-none focus:outline-none focus:border-sky-500/70 mt-2 w-full p-2 rounded-md border-[1px] border-sky-500/20" type="text" name="name" id="name" placeholder="Escribe tu nombre..." autoComplete="off" required />
        </section>
        <section>
          <label className="block text-slate-300 font-bold font-headings" htmlFor="email">Email</label>
          <input className="active:outline-none focus:outline-none focus:border-sky-500/70 mt-2 w-full p-2 rounded-md border-[1px] border-sky-500/20" type="email" name="email" id="email" placeholder="Escribe tu email..." autoComplete="off" required />
        </section>
        <section>
          <label className="block text-slate-300 font-bold font-headings" htmlFor="message">Mensaje</label>
          <textarea className="h-28 resize-none active:outline-none focus:outline-none focus:border-sky-500/70 mt-2 w-full p-2 rounded-md border-[1px] border-sky-500/20" name="message" id="message" placeholder="Dime que necesitas..." required></textarea>
        </section>
        <button className="w-full p-2 mt-2 rounded-md border-[1px] bg-sky-500/60 text-white border-sky-500/20 transition-colors duration-300 hover:bg-sky-500/20 cursor-pointer" type="submit">Enviar mensaje</button>
      </form>
    </>
  )
}