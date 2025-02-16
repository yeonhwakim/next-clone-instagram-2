import { signIn, providerMap } from "@/auth";
import ColorButton from "@/components/ui/ColorButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signin",
  description: "Signup or Login to Instantgram",
};

type Props = {
  searchParams: Promise<{ callbackUrl: string | undefined }>;
};
export default async function SignInPage({ searchParams }: Props) {
  const { callbackUrl } = await searchParams;

  return (
    <div className="flex justify-center mt-24 ">
      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.id}
          action={async () => {
            "use server";
            await signIn(provider.id, {
              redirectTo: callbackUrl ?? "/",
            });
          }}
        >
          <ColorButton
            text={`Sign in with ${provider.name}`}
            type="submit"
            size="big"
          />
        </form>
      ))}
    </div>
  );
}
