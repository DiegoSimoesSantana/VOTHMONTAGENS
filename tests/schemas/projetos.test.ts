import { describe, expect, it } from "vitest";
import { criarProjetoSchema } from "../../lib/schemas/projetos";

function imageFile(name: string, contentType = "image/jpeg", size = 2048) {
  const blob = new Blob(["x".repeat(size)], { type: contentType });
  return new File([blob], name, { type: contentType });
}

describe("criarProjetoSchema", () => {
  it("aceita payload válido", () => {
    const payload = criarProjetoSchema.parse({
      titulo: "Teste hidrostático em reservatório",
      local: "Serra/ES",
      dataExecucaoRaw: "2026-05-03",
      cliente: "Cliente Industrial",
      descricaoCurta: "Teste comissionado com sucesso",
      descricaoCompleta: "Execução completa da preparação até liberação final.",
      categoria: "teste-hidrostatico",
      arquivos: [imageFile("foto-1.jpg")],
    });

    expect(payload.titulo).toBe("Teste hidrostático em reservatório");
  });

  it("rejeita conteúdo com tag HTML", () => {
    expect(() =>
      criarProjetoSchema.parse({
        titulo: "<script>alert('xss')</script>",
        local: "Serra/ES",
        dataExecucaoRaw: "2026-05-03",
        cliente: "Cliente",
        descricaoCurta: "Ok",
        descricaoCompleta: null,
        categoria: "montagem",
        arquivos: [imageFile("foto.jpg")],
      })
    ).toThrow();
  });

  it("rejeita arquivos não-imagem", () => {
    const pdfBlob = new Blob(["conteudo"], { type: "application/pdf" });
    const pdf = new File([pdfBlob], "arquivo.pdf", { type: "application/pdf" });

    expect(() =>
      criarProjetoSchema.parse({
        titulo: "Projeto válido",
        local: "Serra/ES",
        dataExecucaoRaw: "2026-05-03",
        cliente: "Cliente",
        descricaoCurta: "Ok",
        descricaoCompleta: null,
        categoria: "montagem",
        arquivos: [pdf],
      })
    ).toThrow();
  });
});
