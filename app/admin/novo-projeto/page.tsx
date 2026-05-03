import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { criarProjeto } from "@/app/actions/projetos";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PROJECT_CATEGORY_FILTERS } from "@/constants/categories";
import { authOptions } from "@/lib/auth";

export default async function NovoProjetoPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-6 py-10 md:py-14">
      <section className="grid gap-6 md:grid-cols-[0.85fr_1.15fr]">
        <div className="section-shell rounded-[2rem] p-8 md:p-10">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-600 transition hover:text-[#0b2538]"
          >
            <ArrowLeft className="h-4 w-4" /> Voltar ao painel
          </Link>

          <span className="mt-8 inline-flex text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
            Publicação guiada
          </span>
          <h1 className="mt-5 font-display text-5xl uppercase leading-[0.92] text-[#0b2538] md:text-6xl">
            Adicione um projeto com leitura de teste, execução e entrega.
          </h1>
          <p className="mt-5 text-sm leading-7 text-slate-600">
            Priorize projetos que mostrem construção do sistema, janelas internas da intervenção,
            teste hidrostático, comissionamento e a condição final de liberação.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Use um título direto, por exemplo: Teste hidrostático e comissionamento de reservatórios.",
              "Na descrição curta, deixe claro o que foi construído, testado ou liberado.",
              "Na descrição completa, explique preparação, interligações, pressurização e entrega.",
              "Escolha Teste Hidrostático como categoria quando esse for o diferencial principal.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-[#173349]/10 bg-white/80 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0b2538]" />
                <p className="text-sm leading-7 text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <Card className="rounded-[2rem] border-[#173349]/10 bg-[rgba(251,250,246,0.96)] shadow-[0_24px_64px_rgba(11,37,56,0.12)]">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="font-display text-4xl uppercase leading-none">Publicar obra</CardTitle>
            <CardDescription className="text-sm leading-7 text-slate-600">
              Ao salvar, você será redirecionado para a página pública do projeto para validar como a obra está sendo apresentada.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 pt-2">
            <div className="mb-6 rounded-[1.5rem] border border-[#173349]/10 bg-[#0b2538] p-5 text-[#f3f0e8]">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#f2b705]">Roteiro sugerido para o primeiro case</p>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Título: Teste hidrostático e comissionamento de reservatórios e linhas auxiliares.
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Descrição curta: Preparação do sistema, interligações, teste hidrostático e liberação operacional com registro fotográfico da execução.
              </p>
            </div>

            <form action={criarProjeto} className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título *</Label>
                <Input
                  id="titulo"
                  name="titulo"
                  placeholder="Ex: Teste hidrostático e comissionamento de reservatórios"
                  required
                  className="h-12 rounded-xl border-[#173349]/15 bg-white/80"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="local">Local *</Label>
                <Input id="local" name="local" placeholder="Ex: São João da Barra/RJ" required className="h-12 rounded-xl border-[#173349]/15 bg-white/80" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="data_execucao">Data *</Label>
                <Input id="data_execucao" name="data_execucao" type="date" required className="h-12 rounded-xl border-[#173349]/15 bg-white/80" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fotos">Múltiplas fotos *</Label>
                <Input id="fotos" name="fotos" type="file" accept="image/*" multiple required className="h-12 rounded-xl border-[#173349]/15 bg-white/80 file:font-semibold" />
              </div>
            </div>

            <details className="rounded-2xl border border-[#173349]/10 bg-white/60 p-5">
              <summary className="cursor-pointer text-sm font-semibold uppercase tracking-[0.18em] text-[#0b2538]">
                Campos complementares (opcional)
              </summary>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="cliente">Cliente</Label>
                  <Input id="cliente" name="cliente" placeholder="Ex: Cliente industrial" className="h-12 rounded-xl border-[#173349]/15 bg-white/80" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoria</Label>
                  <select
                    id="categoria"
                    name="categoria"
                    defaultValue="teste-hidrostatico"
                    className="h-12 w-full rounded-xl border border-[#173349]/15 bg-white/80 px-4 text-sm text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-[#0b2538]"
                  >
                    {PROJECT_CATEGORY_FILTERS.filter((item) => item.value).map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="descricao_curta">Descrição curta</Label>
                  <Input
                    id="descricao_curta"
                    name="descricao_curta"
                    placeholder="Resumo objetivo: o que foi testado, ajustado e liberado"
                    className="h-12 rounded-xl border-[#173349]/15 bg-white/80"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="descricao_completa">Descrição completa</Label>
                  <Textarea
                    id="descricao_completa"
                    name="descricao_completa"
                    placeholder="Explique a construção, as janelas internas da intervenção, a preparação para teste, o comissionamento e a condição de entrega do sistema"
                    className="min-h-36 rounded-2xl border-[#173349]/15 bg-white/80"
                  />
                </div>
              </div>
            </details>

            <Button variant="accent" type="submit" className="h-12 rounded-full px-6">
              Salvar e publicar agora
            </Button>
          </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
