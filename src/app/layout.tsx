import Layout from '@/components/_ui/template/Layout';
import SessionProviderWrapper from '@/utils/sessionProviderWrapper';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProviderWrapper>
      <html lang="pt-BR">
        <title>AGP AGENDADOR PORTUÁRIO</title>
        <body>
          <Layout>
            {children}
          </Layout>
        </body>
      </html>
    </SessionProviderWrapper>
  )
}
