# INÍCIO OFICIAL DO DESENVOLVIMENTO

1. Leia integralmente `LAST_HORIZON_BIBLIA_CODEX.md`.
2. Considere `data/` como fonte estruturada oficial.
3. Não avance automaticamente por todas as fases.
4. Execute agora somente a fase F00 abaixo.
5. Ao terminar, entregue auditoria, arquivos e testes para aprovação antes de F01.

# PROMPT CODEX - F00 - Contrato técnico e inventário - v0.0.1

Você está trabalhando em **LAST HORIZON - Global Space Agency Simulator**, um PWA mobile-first em HTML, CSS e JavaScript modular, compatível com GitHub Pages e preparado para conversão futura em APK. A agência fictícia oficial é **GSEA - Global Space Exploration Agency**, o programa é **PROJECT HAVEN**, a nave é **ARK-01** e a assistente é **AURA - Autonomous Unified Response Assistant**.

REGRAS INVIOLÁVEIS:
1. Antes de alterar arquivos, audite o estado atual, preserve tudo que funciona e identifique dependências.
2. O jogo é horizontal. Em retrato, mostrar bloqueio elegante de rotação.
3. Interface utilizável por toque, mouse e teclado; alvo mínimo de toque 44 px.
4. Não usar serviços, APIs, mapas, fontes ou bibliotecas pagas.
5. Não usar marca, logotipo, uniforme ou alegação de parceria com a NASA.
6. Estado centralizado; UI nunca mantém cópia divergente do estado de simulação.
7. Aleatoriedade crítica usa seed registrada e reproduzível.
8. Falhas possuem causa, fatores, sintomas, propagação, detecção e mitigação.
9. Saves em IndexedDB com migração, checksum, autosave e recuperação; nunca apagar silenciosamente.
10. Instrumentos são SVG/HTML/Canvas; fundos não contêm ponteiros, números, textos ou luzes funcionais.
11. Textos visíveis vêm do sistema de idioma.
12. Sem comentários de desenvolvimento na interface final: não exibir fase, versão de teste, futuro DLC, TODO ou instruções para Codex.
13. Ao concluir, auditar console, rotas, responsividade, offline, saves, acessibilidade e regressões.

## Objetivo
Criar documentação, árvore de arquivos, convenções, versionamento e critérios de aceite antes de qualquer feature.

## Arquivos e módulos prioritários
- `README.md`
- `CHANGELOG.md`
- `version.json`
- `docs/architecture.md`
- `docs/state-schema.md`

## Implementação obrigatória
- Entregar lógica real, não apenas mock visual.
- Usar dados externos em JSON quando o conteúdo for balanceável ou narrativo.
- Criar validações e mensagens claras para estados inválidos.
- Manter compatibilidade com saves anteriores por migração.
- Atualizar `version.json`, `CHANGELOG.md` e documentação técnica.
- Listar arquivos criados, alterados e removidos.
- Executar testes disponíveis e registrar o resultado.

## Critérios de aceite
- Projeto abre sem erros
- Nenhuma dependência paga
- Rotas e nomes oficiais definidos
- Checklist anti-quebra registrado

## Auditoria final da fase
1. Abrir nova campanha e save existente.
2. Testar mobile horizontal em resolução pequena e desktop.
3. Desligar internet e confirmar funcionamento previsto.
4. Verificar console sem erros.
5. Confirmar que nenhum recurso anterior desapareceu.
6. Confirmar que a interface final não contém observações ao desenvolvedor.
