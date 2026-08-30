import type { ComponentType } from "react";

// HOC withLoading - reutilizacao de logica

interface WithLoadingProps {
    
    loading: boolean;

}

export function withLoading<P extends object>(
    WrappedComponent: ComponentType<P>,
    loadingMessage: string = "Carregando..."

) {

    return function WithLoadingComponent(props: P & WithLoadingProps) {

        const { loading, ...restProps } = props;

        if (loading) {

            return (

                <div className="loading-container">

                    <div className="spinner"></div>
                    <p>{loadingMessage}</p>

                </div>
            );
        }

        return <WrappedComponent {...(restProps as P)} />
    };
}