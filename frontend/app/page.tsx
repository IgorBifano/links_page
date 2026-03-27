import { AuthorityStrip } from "@/components/authority-strip";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { LinkGroup } from "@/components/link-group";
import { PageBackground } from "@/components/page-background";
import { PremiumCta } from "@/components/premium-cta";
import { SectionHeading } from "@/components/section-heading";
import { siteContent } from "@/data/site-content";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-base text-text">
      <PageBackground />
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 pb-12 pt-6 sm:px-8 lg:px-10">
        <Hero profile={siteContent.profile} />

        <section className="mt-8">
          <PremiumCta cta={siteContent.primaryCta} />
        </section>

        <section className="mt-14">
          <SectionHeading
            eyebrow="Links Curados"
            title="Conteudo, projetos e conexoes organizados com intencao."
            description="Cada bloco foi desenhado para direcionar rapido, com contexto suficiente para gerar interesse e conversao."
          />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {siteContent.linkGroups.map((group, index) => (
              <LinkGroup key={group.title} group={group} index={index} />
            ))}
          </div>
        </section>

        <section className="mt-14">
          <SectionHeading
            eyebrow="Autoridade"
            title="Credibilidade compacta, sem inflar o layout."
            description="Sinais claros de profundidade tecnica e orientacao para execucao."
          />
          <AuthorityStrip items={siteContent.authority} />
        </section>

        <Footer footer={siteContent.footer} socialLinks={siteContent.socialLinks} />
      </div>
    </main>
  );
}
