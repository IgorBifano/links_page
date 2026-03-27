export type LinkItem = {
  title: string;
  description: string;
  href: string;
  icon: "graduation" | "sparkles" | "star" | "briefcase" | "waves" | "file" | "book" | "message" | "instagram" | "mail";
  accent: string;
};

export type LinkGroupType = {
  title: string;
  description: string;
  links: LinkItem[];
};

export const siteContent = {
  profile: {
    name: "Igor Bifano",
    role: "Engenharia de software, IA aplicada e sistemas com profundidade.",
    bio: "Hub de marca pessoal para centralizar formacao, projetos e pontos de contato com uma apresentacao objetiva, sofisticada e pronta para conversao."
  },
  primaryCta: {
    eyebrow: "Destaque Principal",
    title: "Formacao Engenharia de Aplicacao",
    description:
      "Uma trilha premium sobre IA, software e sistemas reais. Estruturada para quem quer construir com criterio tecnico e visao de produto.",
    href: "#aprender",
    badge: "Vagas e lista de espera"
  },
  linkGroups: [
    {
      title: "Aprender",
      description: "Entradas para quem quer acompanhar a formacao e os proximos lancamentos.",
      links: [
        {
          title: "Formacao Engenharia de Aplicacao",
          description: "Programa principal com foco em IA, arquitetura e entrega de software.",
          href: "#",
          icon: "graduation",
          accent: "from-accent/20 to-transparent"
        },
        {
          title: "Pagina futura do curso",
          description: "Visao geral da proposta, modulos, calendario e posicionamento.",
          href: "#",
          icon: "sparkles",
          accent: "from-sky-400/20 to-transparent"
        },
        {
          title: "Lista de espera",
          description: "Receba atualizacoes, abertura de vagas e novidades antes do lancamento.",
          href: "#",
          icon: "star",
          accent: "from-fuchsia-400/20 to-transparent"
        }
      ]
    },
    {
      title: "Projetos",
      description: "Empresas e iniciativas com foco em execucao, tecnologia e estrutura.",
      links: [
        {
          title: "Simias",
          description: "Camada de produtos e experimentos guiados por IA aplicada.",
          href: "#",
          icon: "briefcase",
          accent: "from-accent/20 to-transparent"
        },
        {
          title: "Simetrya",
          description: "Construcao de sistemas com clareza tecnica e consistencia operacional.",
          href: "#",
          icon: "waves",
          accent: "from-sky-400/20 to-transparent"
        },
        {
          title: "Primal Enterprises",
          description: "Hub para iniciativas de longo prazo, ativos digitais e novas frentes.",
          href: "#",
          icon: "star",
          accent: "from-fuchsia-400/20 to-transparent"
        }
      ]
    },
    {
      title: "Conteudo",
      description: "Pontos de contato para estudo continuo, referencias e publicacoes.",
      links: [
        {
          title: "Blog",
          description: "Ensaios e aprendizados sobre software, automacao, IA e criacao.",
          href: "#",
          icon: "file",
          accent: "from-accent/20 to-transparent"
        },
        {
          title: "Artigos",
          description: "Textos mais densos, opinioes tecnicas e exploracoes de arquitetura.",
          href: "#",
          icon: "book",
          accent: "from-sky-400/20 to-transparent"
        },
        {
          title: "Estudos",
          description: "Mapas de estudo, notas de leitura e colecoes de referencia.",
          href: "#",
          icon: "graduation",
          accent: "from-fuchsia-400/20 to-transparent"
        }
      ]
    },
    {
      title: "Contato",
      description: "Canais diretos para parcerias, conversas estrategicas e networking.",
      links: [
        {
          title: "WhatsApp",
          description: "Canal rapido para oportunidades e conversas objetivas.",
          href: "https://wa.me/",
          icon: "message",
          accent: "from-accent/20 to-transparent"
        },
        {
          title: "Instagram",
          description: "Bastidores, visao de marca pessoal e atualizacoes recorrentes.",
          href: "https://instagram.com/",
          icon: "instagram",
          accent: "from-sky-400/20 to-transparent"
        },
        {
          title: "Email",
          description: "Para propostas comerciais, convites e contatos institucionais.",
          href: "mailto:contato@igorbifano.com",
          icon: "mail",
          accent: "from-fuchsia-400/20 to-transparent"
        }
      ]
    }
  ] satisfies LinkGroupType[],
  authority: [
    { value: "+70h", label: "de conteudo estruturado" },
    { value: "IA + Sistemas", label: "foco em aplicacao real" },
    { value: "Projetos reais", label: "execucao alem da teoria" },
    { value: "Certificado", label: "fechamento premium da jornada" }
  ],
  socialLinks: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "WhatsApp", href: "https://wa.me/" },
    { label: "Email", href: "mailto:contato@igorbifano.com" }
  ],
  footer: {
    statement: "Software, IA e sistemas para construir com criterio, consistencia e autoridade.",
    copyright: "© 2026 Igor Bifano. Todos os direitos reservados."
  }
};
