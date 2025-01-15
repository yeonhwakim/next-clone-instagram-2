import { signIn, providerMap } from "@/auth";
import ColorButton from "@/components/ui/ColorButton";

type Props = {
  searchParams: { callbackUrl: string | undefined };
};
export default async function SignInPage({
  searchParams: { callbackUrl },
}: Props) {
  return (
    <div className="flex justify-center mt-[30%] ">
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
