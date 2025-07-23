import { useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import { getLangFromUrl, getTranslations } from "../utils/translations";
import emailjs from "@emailjs/browser";

export const ContactForm = () => {
  const form = useRef(null);
  const lang = getLangFromUrl(new URL(window.location.href));
  const t = getTranslations(lang);

  const handleSendEmail = (evt) => {
    evt.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.PUBLIC_SERVICE_ID,
        import.meta.env.PUBLIC_TEMPLATE_ID,
        form.current,
        {
          publicKey: import.meta.env.PUBLIC_KEY,
        }
      )
      .then(() => {
        toast(t("contact.success"), {
          style: {
            border: "1px solid #713200",
            padding: "10px",
          },
        });
      })
      .catch((error) => {
        toast.error(t("contact.error") + error, {
          style: {
            border: "1px solid red",
          },
        });
      });
  };

  return (
    <>
      <Toaster />
      <form
        ref={form}
        className="flex flex-col space-y-8"
        onSubmit={handleSendEmail}
      >
        <section>
          <label
            className="block text-slate-300 font-bold font-headings"
            htmlFor="name"
          >
            {t("contact.labelName")}
          </label>
          <input
            className="active:outline-none focus:outline-none focus:border-sky-500/70 w-full p-2 rounded-md border-[1px] border-sky-500/20"
            type="text"
            name="name"
            id="name"
            placeholder={t("contact.placeholderName")}
            autoComplete="off"
            required
          />
        </section>
        <section>
          <label
            className="block text-slate-300 font-bold font-headings"
            htmlFor="email"
          >
            {t("contact.labelEmail")}
          </label>
          <input
            className="active:outline-none focus:outline-none focus:border-sky-500/70 mt-2 w-full p-2 rounded-md border-[1px] border-sky-500/20"
            type="email"
            name="email"
            id="email"
            placeholder={t("contact.placeholderEmail")}
            autoComplete="off"
            required
          />
        </section>
        <section>
          <label
            className="block text-slate-300 font-bold font-headings"
            htmlFor="message"
          >
            {t("contact.labelMessage")}
          </label>
          <textarea
            className="h-28 resize-none active:outline-none focus:outline-none focus:border-sky-500/70 mt-2 w-full p-2 rounded-md border-[1px] border-sky-500/20"
            name="message"
            id="message"
            placeholder={t("contact.placeholderMessage")}
            required
          ></textarea>
        </section>
        <button
          className="w-full p-2 mt-2 rounded-md border-[1px] bg-sky-500/60 text-white border-sky-500/20 transition-colors duration-300 hover:bg-sky-500/20 cursor-pointer"
          type="submit"
        >
          {t("contact.labelSend")}
        </button>
      </form>
    </>
  );
};
