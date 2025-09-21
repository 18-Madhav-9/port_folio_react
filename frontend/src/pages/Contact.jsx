import { useState } from "react";
import { CheckCircle, Send } from "lucide-react";
import AutoSizingInput from "../components/ui/AutoSizingInput";
import { submitContactForm } from "../services/api";

const initialFormData = { name: "", message: "", email: "" };

const Contact = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.message.trim()) newErrors.message = true;
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus("submitting");

    try {
      const response = await submitContactForm(formData);

      if (response?.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  if (status === "success") {
    const firstName = formData.name.trim().split(/\s+/)[0] || "there";

    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4 text-center py-20 min-h-[500px] animate-in fade-in duration-500">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 border border-green-200 dark:border-green-500/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4 transition-colors">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 transition-colors">
          Got it, {firstName}!
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-lg max-w-md transition-colors">
          I've received your message. I'll be in touch at{" "}
          <span className="font-medium text-slate-800 dark:text-slate-100">
            {formData.email}
          </span>{" "}
          very soon.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setFormData(initialFormData);
            setErrors({});
          }}
          className="mt-6 text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 hover:underline transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12 max-w-3xl animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 transition-colors">
          Let's Connect
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1 text-sm transition-colors">
          Fill in the blanks below to start the conversation.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12" noValidate>
        <div className="text-2xl md:text-3xl text-slate-700 dark:text-slate-300 leading-[2.5] md:leading-[2.5] font-light transition-colors">
          Hi! My name is
          <AutoSizingInput
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="your name"
            error={errors.name}
          />
          and I have
          <AutoSizingInput
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="a project idea/Job"
            error={errors.message}
          />
          that needs your help. You can reach me at
          <AutoSizingInput
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your email"
            error={errors.email}
          />
          to get things started.
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 dark:border-slate-700/50 pt-8 gap-4 transition-colors">
          <div className="text-sm text-red-500 font-medium h-5">
            {Object.keys(errors).length > 0 && "Please fill out all fields correctly."}
            {status === "error" && Object.keys(errors).length === 0 && "Failed to send message. Please try again."}
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all font-medium disabled:opacity-70 disabled:cursor-not-allowed group w-full sm:w-auto shadow-md dark:shadow-indigo-900/20"
          >
            {status === "submitting" ? (
              "Sending..."
            ) : (
              <>
                Let's Build Together
                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;