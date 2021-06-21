/*
  Этот файл нужен для доступа к самому старшему компоненту приложения.
  В основном его смысл заключается в управлении состоянием.
  https://nextjs.org/docs/#custom-app
*/
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import Page from '../components/Page';
import withData from '../lib/withData';

class MyApp extends App {
  // GetInitialProps - Стандартный метод для любого компонента в Next.js, нам нужно его чутка прокачать, чтобы работать с данными.
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // Даем доступ в квери через пропсы:
    pageProps.query = ctx.query;
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
