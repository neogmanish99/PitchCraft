"use client";
import React, { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const StartupForm = () => {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [pitch, setPitch] = useState("");
    const router = useRouter();

    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch,
            };

            // zod validation
            await formSchema.parseAsync(formValues);

            console.log(formValues);

            // calling my server Action
            const result = await createPitch(prevState, formData, pitch);

            if (result.status == "SUCCESS") {
                toast("SUCCESS", {
                    description: "Startup has been created successfully",
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                });
                router.push(`/startup/${result._id}`);
            }
            console.log(result);
            return result;
        } catch (err) {
            if (err instanceof z.ZodError) {
                const fieldErrors = err.flatten().fieldErrors;
                setErrors(fieldErrors as unknown as Record<string, string>);

                toast("Error", {
                    description: "Please check your inputs",
                    action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                    },
                });

                return {
                    ...prevState,
                    error: "Validation failed",
                    status: "ERROR",
                };
            }

            // Unexpected error
            toast("Error", {
                description: "An unexpected error has occurred",
                action: {
                    label: "Undo",
                    onClick: () => console.log("Undo"),
                },
            });

            return {
                ...prevState,
                error: "An unexpected error has occurred",
                status: "ERROR",
            };
        }
    };

    const [state, formAction, isPending] = useActionState(handleFormSubmit, {
        error: "",
        status: "INITIAL",
    });

    return (
        <div className="container mx-auto p-16  ">
            <form action={formAction}>
                <div>
                    <label htmlFor="title" className="startup-form_label">
                        Title
                    </label>
                    <Input
                        id="title"
                        name="title"
                        className="startup-form_input mb-10"
                        required
                        placeholder="Startup"
                    />

                    {errors.title && (
                        <p className="startup-form_error">{errors.title}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="description" className="startup-form_label">
                        Description
                    </label>
                    <Textarea
                        id="description"
                        name="description"
                        className="startup-form_textarea mb-10"
                        required
                        placeholder="Startup Description"
                    />

                    {errors.description && (
                        <p className="startup-form_error">
                            {errors.description}
                        </p>
                    )}
                </div>
                <div>
                    <label htmlFor="category" className="startup-form_label">
                        Category
                    </label>
                    <Input
                        id="category"
                        name="category"
                        className="startup-form_input mb-10"
                        required
                        placeholder="Startup category (Health, Tech , etc...)"
                    />

                    {errors.category && (
                        <p className="startup-form_error">{errors.category}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="link" className="startup-form_label">
                        Image URL
                    </label>
                    <Input
                        id="link"
                        name="link"
                        className="startup-form_input mb-14"
                        required
                        placeholder="Startup Image Url"
                    />

                    {errors.link && (
                        <p className="startup-form_error">{errors.link}</p>
                    )}
                </div>
                <div data-color-mode="light">
                    <label htmlFor="pitch" className="startup-form_label">
                        Pitch
                    </label>
                    <MDEditor
                        autoCapitalize="off"
                        value={pitch}
                        onChange={(value) => setPitch(value as string)}
                        id="pitch"
                        preview="edit"
                        height={300}
                        style={{ borderRadius: 20, overflow: "hidden" }}
                        textareaProps={{
                            placeholder: "Briefly desc your idea!",
                        }}
                        previewOptions={{
                            disallowedElements: ["style"],
                        }}
                    />

                    {errors.pitch && (
                        <p className="startup-form_error">{errors.pitch}</p>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={isPending}
                    className="startup-form_btn mt-10 text-white "
                >
                    {isPending ? "Submitting..." : "Submit your startup"}{" "}
                    <Send className="size-6 ml-2" />
                </Button>
            </form>
        </div>
    );
};

export default StartupForm;
