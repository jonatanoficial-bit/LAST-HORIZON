# Empacotamento comercial gratuito

O LAST HORIZON não depende de Unity ou Unreal. O jogo atual é uma PWA WebGL instalável, hospeda-se gratuitamente no GitHub Pages e continua funcional offline após o primeiro carregamento.

## GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` testa e publica a branch `main`. No GitHub, abra **Settings > Pages > Source** e selecione **GitHub Actions**. Cada `git push` aprovado executará os 80 testes antes da publicação.

## Instalação como aplicativo

- PC e Android: abra a URL publicada no Chrome/Edge e use **Instalar aplicativo**. O manifesto, ícone, orientação e service worker já estão incluídos.
- Windows executável: Tauri 2 é gratuito e pode envolver a mesma interface em WebView2. Faça isso somente após assinatura, política de privacidade e QA de loja.
- Android APK/AAB: Capacitor é gratuito. Ele empacota a PWA em um projeto Android Studio; a publicação na Play Store exige a taxa da própria loja, não uma licença de engine.

## Limites honestos antes de cobrar

O build 14 é uma fundação comercial jogável, não uma certificação de produto final. Antes de vender, ainda são necessários testes em aparelhos reais, revisão jurídica das licenças, política de privacidade, suporte, telemetria opt-in, crash reporting, acessibilidade auditada, performance por dispositivo e a produção audiovisual listada no pacote de prompts.

O save local e a exportação manual funcionam sem servidor. Sincronização em nuvem, contas e ranking exigem um backend; não foram simulados como se existissem. Serviços com camada gratuita podem mudar limites e não devem ser considerados gratuitos para sempre.
