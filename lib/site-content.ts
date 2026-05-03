export const whatsappHref = "https://wa.me/5527997559365?text=Ol%C3%A1%2C%20quero%20falar%20com%20um%20engenheiro%20da%20VOTH%20sobre%20uma%20demanda%20industrial.";
export const commercialEmail = "gilberto.visentin@vothmontagem.com.br";

function mediaPath(fileName: string) {
  return `/img/${encodeURIComponent(fileName)}`;
}

const localMedia = {
  tanque: mediaPath("18231dff-77f5-4ee0-9730-db9f18c2c7e5.jpeg"),
  estrutura: mediaPath("b0a80149-7e7c-438c-9637-2af32e34b0e1.jpeg"),
  montagem: mediaPath("bf90a74a-4abc-4d3c-98ac-ae71a1fd3279.jpeg"),
  reservatorio: mediaPath("e12cb1cc-7624-44f9-a3d3-23d950bc6cfc.jpeg"),
  tubulacao: mediaPath("ee855fff-fd20-4e18-8762-0ba66c80da14.jpeg"),
  campo1: mediaPath("WhatsApp Image 2026-02-28 at 11.56.07.jpeg"),
  campo2: mediaPath("WhatsApp Image 2026-02-28 at 11.56.08.jpeg"),
  campo3: mediaPath("WhatsApp Image 2026-02-28 at 11.56.08 (1).jpeg"),
  campo4: mediaPath("WhatsApp Image 2026-02-28 at 11.56.08 (2).jpeg"),
  campo5: mediaPath("WhatsApp Image 2026-02-28 at 11.56.09.jpeg"),
  campo6: mediaPath("WhatsApp Image 2026-02-28 at 11.56.09 (1).jpeg"),
  videoMontagem: mediaPath("WhatsApp Video 2026-03-02 at 15.32.12.mp4"),
  videoCampo: mediaPath("WhatsApp Video 2026-02-28 at 11.37.21.mp4"),
} as const;

export const services = [
  {
    title: "Montagem industrial e caldeiraria",
    description:
      "Fabricação, montagem e adequação de tubulações, flanges, suportes, vasos e estruturas metálicas em campo.",
    image: localMedia.montagem,
    badge: "Montagem",
    href: "/portfolio?categoria=montagem",
  },
  {
    title: "Inspeção, END e NR-13",
    description:
      "Leitura de integridade, inspeção em ativos pressurizados e suporte técnico em ambientes de segurança crítica.",
    image: localMedia.reservatorio,
    badge: "Integridade",
    href: "/portfolio?categoria=inspecao",
  },
  {
    title: "Teste hidrostático",
    description:
      "Preparação da linha, pressurização, estabilização e validação da estanqueidade com rastreabilidade.",
    image: localMedia.tubulacao,
    badge: "Testes",
    href: "/portfolio?categoria=teste-hidrostatico",
  },
  {
    title: "SPDA e aterramento industrial",
    description:
      "Execução de malhas, descidas, interligações e pontos de aterramento para proteção de estruturas e ativos industriais.",
    image: localMedia.estrutura,
    badge: "SPDA",
    href: "/portfolio?categoria=spda",
  },
] as const;

export const fallbackGallery = [
  {
    title: "Montagem de tanques e linhas auxiliares",
    label: "Portfólio de campo",
    text: "Implantação de reservatórios, guarda-corpo, acessos, interligações e preparação para teste e entrega.",
    image: localMedia.tanque,
  },
  {
    title: "Inspeção, teste e comissionamento",
    label: "Referência técnica",
    text: "Projetos conduzidos com leitura visual da obra, critério de integridade e validação operacional clara.",
    image: localMedia.campo5,
  },
  {
    title: "Adutoras, aquedutos e infraestrutura",
    label: "Rede industrial",
    text: "Frentes com adequações, travessias, soldagem e organização do sistema para continuidade operacional.",
    image: localMedia.campo2,
  },
] as const;

export const featuredVideos = [
  {
    title: "Registro de montagem em campo",
    label: "Video real da operacao",
    text: "Movimentacao e leitura visual da frente executada pela VOTH em ambiente industrial real.",
    src: localMedia.videoMontagem,
    poster: localMedia.campo6,
  },
  {
    title: "Detalhe operacional da execucao",
    label: "Video real da obra",
    text: "Tomada curta para reforcar escala, contexto fisico da frente e evidencia da entrega em campo.",
    src: localMedia.videoCampo,
    poster: localMedia.campo3,
  },
] as const;

export const trustItems = ["NR-13", "END", "SPDA", "Comissionamento", "Teste Hidrostático", "Caldeiraria"] as const;

export const proofStats = [
  {
    value: "20 anos",
    label: "Experiência somada em campo industrial",
  },
  {
    value: "B2B",
    label: "Atuação pensada para engenharia, manutenção e suprimentos",
  },
  {
    value: "360°",
    label: "Montagem, teste, inspeção, comissionamento e liberação",
  },
] as const;

export const proofPillars = [
  {
    title: "Autoridade técnica",
    text: "Capacidade de execução em ativos críticos, apresentada com clareza.",
  },
  {
    title: "Segurança operacional",
    text: "Normas, disciplina de campo e leitura de risco como valor central da atuação.",
  },
  {
    title: "Referência visual",
    text: "Imagens de montagem, inspeção e teste reforçam contexto, método e evidência de execução.",
  },
] as const;

export const socialLogos = ["NR-13", "END", "Caldeiraria", "Tubulação", "Comissionamento", "SPDA"] as const;

export const processImageMap = {
  montagem: [
    {
      image: localMedia.montagem,
      label: "Etapa interna",
      title: "Preparação e montagem",
      text: "Leitura da frente, montagem de linhas, suportes e interfaces antes da validação final.",
    },
    {
      image: localMedia.tanque,
      label: "Etapa interna",
      title: "Ajuste e entrega",
      text: "Organização do conjunto, acabamento e prontidão para inspeção ou operação assistida.",
    },
  ],
  manutencao: [
    {
      image: localMedia.campo1,
      label: "Etapa interna",
      title: "Intervenção técnica",
      text: "Correções, recomposição de trechos críticos e controle do retorno operacional da frente.",
    },
    {
      image: localMedia.campo4,
      label: "Etapa interna",
      title: "Verificação final",
      text: "Checagens de integridade e fechamento da intervenção com registro da condição entregue.",
    },
  ],
  inspecao: [
    {
      image: localMedia.reservatorio,
      label: "Etapa interna",
      title: "Levantamento e acesso",
      text: "Mapeamento visual do ativo, pontos de atenção e condições para decisão técnica.",
    },
    {
      image: localMedia.campo5,
      label: "Etapa interna",
      title: "Registro e parecer",
      text: "Consolidação da inspeção com evidência visual e leitura de integridade para o próximo passo.",
    },
  ],
  "teste-hidrostatico": [
    {
      image: localMedia.tubulacao,
      label: "Etapa interna",
      title: "Preparação e pressurização",
      text: "Isolamento de trechos, preparação da linha e início da validação de estanqueidade.",
    },
    {
      image: localMedia.campo2,
      label: "Etapa interna",
      title: "Estabilização e liberação",
      text: "Acompanhamento do comportamento da rede, estabilização e registro da condição liberada.",
    },
  ],
  spda: [
    {
      image: localMedia.estrutura,
      label: "Etapa interna",
      title: "Malha e interligações",
      text: "Execução de descidas, conexões e distribuição dos pontos de proteção do sistema.",
    },
    {
      image: localMedia.campo3,
      label: "Etapa interna",
      title: "Continuidade e conformidade",
      text: "Verificação final do aterramento, continuidade e prontidão para inspeção e uso.",
    },
  ],
} as const;

export const segmentItems = [
  "Petroquímica e óleo e gás",
  "Siderurgia e mineração",
  "Adutoras, aquedutos e reservatórios",
  "Utilidades industriais e ativos pressurizados",
] as const;