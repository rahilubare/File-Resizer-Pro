import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { PassThrough } from 'node:stream';
import { createReadableStreamFromReadable } from '@react-router/node';
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, useNavigate, useLocation, Meta, Links, ScrollRestoration, Scripts, useRouteError, useAsyncError } from 'react-router';
import { isbot } from 'isbot';
import { renderToPipeableStream } from 'react-dom/server';
import { forwardRef, useEffect, createElement, useRef, useState, Component, useCallback } from 'react';
import { useButton } from '@react-aria/button';
import { toPng } from 'html-to-image';
import { f as fetchWithHeaders } from './index-R0GlAIsV.js';
import { SessionProvider } from '@hono/auth-js/react';
import { serializeError } from 'serialize-error';
import { toast, Toaster } from 'sonner';
import { create } from 'zustand';
import { useIdleTimer } from 'react-idle-timer';
import { Scaling, Folder, HardDrive, ChevronDown, ChevronRight, FolderOpen, FileImage, FileText, ChevronUp, Eye, Download, ArrowRight, RotateCcw, Search, X, ArrowUpDown, Settings, CheckCircle, TrendingDown, Clock, SlidersHorizontal } from 'lucide-react';
import fg from 'fast-glob';
import 'node:async_hooks';
import 'node:console';
import '@auth/core';
import '@auth/core/providers/credentials';
import '@hono/auth-js';
import '@neondatabase/serverless';
import 'argon2';
import 'hono';
import 'hono/context-storage';
import 'hono/cors';
import 'hono/proxy';
import 'hono/body-limit';
import 'hono/request-id';
import 'hono/factory';
import '@hono/node-server';
import '@hono/node-server/serve-static';
import 'hono/logger';
import 'ws';
import '@auth/core/jwt';

const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  if (request.method.toUpperCase() === "HEAD") {
    return new Response(null, {
      status: responseStatusCode,
      headers: responseHeaders
    });
  }
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}

const entryServer = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: 'Module' }));

const JSX_RENDER_ID_ATTRIBUTE_NAME = "data-render-id";
function buildGridPlaceholder(w, h) {
  const size = Math.max(w, h);
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 895 895" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="895" height="895" fill="#E9E7E7"/>
<g>
<line x1="447.505" y1="-23" x2="447.505" y2="901" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="447.505" x2="5.66443" y2="447.505" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="278.068" x2="5.66443" y2="278.068" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="57.1505" x2="5.66443" y2="57.1504" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="61.8051" y1="883.671" x2="61.8051" y2="6.10572e-05" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="282.495" y1="907" x2="282.495" y2="-30" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="611.495" y1="907" x2="611.495" y2="-30" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="832.185" y1="883.671" x2="832.185" y2="6.10572e-05" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="827.53" x2="5.66443" y2="827.53" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="889.335" y1="606.613" x2="5.66443" y2="606.612" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="4.3568" y1="4.6428" x2="889.357" y2="888.643" stroke="#C0C0C0" stroke-width="1.00975"/>
<line x1="-0.3568" y1="894.643" x2="894.643" y2="0.642772" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="447.5" cy="441.5" r="163.995" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="447.911" cy="447.911" r="237.407" stroke="#C0C0C0" stroke-width="1.00975"/>
<circle cx="448" cy="442" r="384.495" stroke="#C0C0C0" stroke-width="1.00975"/>
</g>
</svg>
`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
function useOptionalRef(ref) {
  const fallbackRef = useRef(null);
  if (ref && "instance" in ref) return fallbackRef;
  return ref ?? fallbackRef;
}
const CreatePolymorphicComponent = /* @__PURE__ */ forwardRef(
  // @ts-ignore
  function CreatePolymorphicComponentRender({
    as,
    children,
    renderId,
    onError,
    ...rest
  }, forwardedRef) {
    const props = as === "img" ? {
      ...rest,
      // keep the original type of onError for <img>
      onError: (e) => {
        if (typeof onError === "function") onError(e);
        const img = e.currentTarget;
        const {
          width,
          height
        } = img.getBoundingClientRect();
        img.dataset.hasFallback = "1";
        img.onerror = null;
        img.src = buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128);
        img.style.objectFit = "cover";
      }
    } : rest;
    const ref = useOptionalRef(forwardedRef);
    useEffect(() => {
      const el = ref && "current" in ref ? ref.current : null;
      if (!el) return;
      if (as !== "img") {
        const placeholder = () => {
          const {
            width,
            height
          } = el.getBoundingClientRect();
          return buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128);
        };
        const applyBgFallback = () => {
          el.dataset.hasFallback = "1";
          el.style.backgroundImage = `url("${placeholder()}")`;
          el.style.backgroundSize = "cover";
        };
        const probeBg = () => {
          const bg = getComputedStyle(el).backgroundImage;
          const match = /url\(["']?(.+?)["']?\)/.exec(bg);
          const src = match?.[1];
          if (!src) return;
          const probe = new Image();
          probe.onerror = applyBgFallback;
          probe.src = src;
        };
        probeBg();
        const ro2 = new ResizeObserver(([entry]) => {
          if (!el.dataset.hasFallback) return;
          const {
            width,
            height
          } = entry.contentRect;
          el.style.backgroundImage = `url("${buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128)}")`;
        });
        ro2.observe(el);
        const mo = new MutationObserver(probeBg);
        mo.observe(el, {
          attributes: true,
          attributeFilter: ["style", "class"]
        });
        return () => {
          ro2.disconnect();
          mo.disconnect();
        };
      }
      if (!el.dataset.hasFallback) return;
      const ro = new ResizeObserver(([entry]) => {
        const {
          width,
          height
        } = entry.contentRect;
        el.src = buildGridPlaceholder(Math.round(width) || 128, Math.round(height) || 128);
      });
      ro.observe(el);
      return () => ro.disconnect();
    }, [as, ref]);
    return /* @__PURE__ */ createElement(as, Object.assign({}, props, {
      ref,
      ...renderId ? {
        [JSX_RENDER_ID_ATTRIBUTE_NAME]: renderId
      } : void 0
    }), children);
  }
);

function LoadFonts() {
  return /* @__PURE__ */ jsx(Fragment, {});
}

const useSandboxStore = create((set, get) => ({
  status: "idle",
  isGenerating: false,
  hasError: false,
  setStatus: (status) => set({
    status,
    isGenerating: status === "codegen-started" || status === "codegen-generating",
    hasError: status === "codegen-error"
  }),
  startCodeGen: () => get().setStatus("codegen-started"),
  setCodeGenGenerating: () => get().setStatus("codegen-generating"),
  completeCodeGen: () => get().setStatus("codegen-complete"),
  errorCodeGen: () => get().setStatus("codegen-error"),
  stopCodeGen: () => get().setStatus("codegen-stopped"),
  resetToIdle: () => get().setStatus("idle")
}));

function HotReloadIndicator() {
  const {
    status: sandboxStatus
  } = useSandboxStore();
  useEffect(() => {
    return;
  }, []);
  useEffect(() => {
    const toastStyle = {
      padding: "16px",
      background: "#18191B",
      border: "1px solid #2C2D2F",
      color: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      width: "var(--width)",
      fontSize: "13px",
      display: "flex",
      alignItems: "center",
      gap: "6px"
    };
    switch (sandboxStatus) {
      case "codegen-started":
      case "codegen-generating":
        toast.custom(() => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          style: {
            ...toastStyle,
            padding: "10px"
          },
          renderId: "render-c88997c1",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            src: "https://www.createanything.com/images/anything-logo-loading-state-white.gif",
            alt: "loading",
            className: "w-8 h-8",
            renderId: "render-31fa6590",
            as: "img"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            renderId: "render-b0d64a36",
            as: "span",
            children: "Updating"
          })]
        }), {
          id: "sandbox-codegen",
          duration: 3e3
        });
        break;
      case "codegen-complete":
        toast.custom(() => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          style: toastStyle,
          renderId: "render-f4bf5f21",
          as: "div",
          children: [/* @__PURE__ */ jsxs("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 20 20",
            fill: "currentColor",
            height: "20",
            width: "20",
            children: [/* @__PURE__ */ jsx("title", {
              children: "Success"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              fillRule: "evenodd",
              d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z",
              clipRule: "evenodd",
              renderId: "render-18dd7595",
              as: "path"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            renderId: "render-d0f9aa82",
            as: "span",
            children: "Updated successfully"
          })]
        }), {
          id: "sandbox-codegen",
          duration: 3e3
        });
        break;
      case "codegen-error":
        toast.custom(() => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          style: toastStyle,
          renderId: "render-c41cac05",
          as: "div",
          children: [/* @__PURE__ */ jsxs("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            fill: "currentColor",
            height: "20",
            width: "20",
            children: [/* @__PURE__ */ jsx("title", {
              children: "Error"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              fillRule: "evenodd",
              d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
              clipRule: "evenodd",
              renderId: "render-cb141c53",
              as: "path"
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            renderId: "render-e1332f32",
            as: "span",
            children: "Update failed"
          })]
        }), {
          id: "sandbox-codegen",
          duration: 5e3
        });
        break;
    }
    return () => {
    };
  }, [sandboxStatus]);
  return null;
}

function useDevServerHeartbeat() {
  useIdleTimer({
    throttle: 6e4 * 3,
    timeout: 6e4,
    onAction: () => {
      fetch("/", {
        method: "GET"
      }).catch((error) => {
      });
    }
  });
}

const links = () => [];
if (globalThis.window && globalThis.window !== void 0) {
  globalThis.window.fetch = fetchWithHeaders;
}
const LoadFontsSSR = LoadFonts ;
function SharedErrorBoundary({
  isOpen,
  children
}) {
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: `fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out ${isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`,
    renderId: "render-af258ce2",
    as: "div",
    children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "bg-[#18191B] text-[#F2F2F2] rounded-lg p-4 max-w-md w-full mx-4 shadow-lg",
      renderId: "render-5733b3c9",
      as: "div",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-start gap-3",
        renderId: "render-83802090",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "flex-shrink-0",
          renderId: "render-18b63607",
          as: "div",
          children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "w-8 h-8 bg-[#F2F2F2] rounded-full flex items-center justify-center",
            renderId: "render-c81965a3",
            as: "div",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-black text-[1.125rem] leading-none",
              renderId: "render-c4b76b09",
              as: "span",
              children: "!"
            })
          })
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex flex-col gap-2 flex-1",
          renderId: "render-bc8e698d",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex flex-col gap-1",
            renderId: "render-2b4e5138",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "font-light text-[#F2F2F2] text-sm",
              renderId: "render-b2292e10",
              as: "p",
              children: "App Error Detected"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-[#959697] text-sm font-light",
              renderId: "render-bf79a258",
              as: "p",
              children: "It looks like an error occurred while trying to use your app."
            })]
          }), children]
        })]
      })
    })
  });
}
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  return /* @__PURE__ */ jsx(SharedErrorBoundary, {
    isOpen: true
  });
});
function InternalErrorBoundary({
  error: errorArg
}) {
  const routeError = useRouteError();
  const asyncError = useAsyncError();
  const error = errorArg ?? asyncError ?? routeError;
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const animateTimer = setTimeout(() => setIsOpen(true), 100);
    return () => clearTimeout(animateTimer);
  }, []);
  const {
    buttonProps: showLogsButtonProps
  } = useButton({
    onPress: useCallback(() => {
      window.parent.postMessage({
        type: "sandbox:web:show-logs"
      }, "*");
    }, [])
  }, useRef(null));
  const {
    buttonProps: fixButtonProps
  } = useButton({
    onPress: useCallback(() => {
      window.parent.postMessage({
        type: "sandbox:web:fix",
        error: serializeError(error)
      }, "*");
      setIsOpen(false);
    }, [error]),
    isDisabled: !error
  }, useRef(null));
  const {
    buttonProps: copyButtonProps
  } = useButton({
    onPress: useCallback(() => {
      navigator.clipboard.writeText(JSON.stringify(serializeError(error)));
    }, [error])
  }, useRef(null));
  function isInIframe() {
    try {
      return window.parent !== window;
    } catch {
      return true;
    }
  }
  return /* @__PURE__ */ jsx(SharedErrorBoundary, {
    isOpen,
    children: isInIframe() ? /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "flex gap-2",
      renderId: "render-20587e1e",
      as: "div",
      children: [!!error && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "flex flex-row items-center justify-center gap-[4px] outline-none transition-colors rounded-[8px] border-[1px] bg-[#f9f9f9] hover:bg-[#dbdbdb] active:bg-[#c4c4c4] border-[#c4c4c4] text-[#18191B] text-sm px-[8px] py-[4px] cursor-pointer",
        type: "button",
        ...fixButtonProps,
        renderId: "render-9b9a3d37",
        as: "button",
        children: "Try to fix"
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "flex flex-row items-center justify-center gap-[4px] outline-none transition-colors rounded-[8px] border-[1px] bg-[#2C2D2F] hover:bg-[#414243] active:bg-[#555658] border-[#414243] text-white text-sm px-[8px] py-[4px]",
        type: "button",
        ...showLogsButtonProps,
        renderId: "render-3407c742",
        as: "button",
        children: "Show logs"
      })]
    }) : /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex flex-row items-center justify-center gap-[4px] outline-none transition-colors rounded-[8px] border-[1px] bg-[#2C2D2F] hover:bg-[#414243] active:bg-[#555658] border-[#414243] text-white text-sm px-[8px] py-[4px] w-fit",
      type: "button",
      ...copyButtonProps,
      renderId: "render-a5468322",
      as: "button",
      children: "Copy error"
    })
  });
}
class ErrorBoundaryWrapper extends Component {
  state = {
    hasError: false,
    error: null
  };
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error
    };
  }
  componentDidCatch(error, info) {
    console.error(error, info);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsx(InternalErrorBoundary, {
        error: this.state.error,
        params: {}
      });
    }
    return this.props.children;
  }
}
function LoaderWrapper({
  loader
}) {
  return /* @__PURE__ */ jsx(Fragment, {
    children: loader()
  });
}
const ClientOnly = ({
  loader
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return /* @__PURE__ */ jsx(ErrorBoundaryWrapper, {
    children: /* @__PURE__ */ jsx(LoaderWrapper, {
      loader
    })
  });
};
function useHmrConnection() {
  const [connected, setConnected] = useState(() => false);
  useEffect(() => {
    return;
  }, []);
  return connected;
}
const healthyResponseType = "sandbox:web:healthcheck:response";
const useHandshakeParent = () => {
  const isHmrConnected = useHmrConnection();
  useEffect(() => {
    const healthyResponse = {
      type: healthyResponseType,
      healthy: isHmrConnected
    };
    const handleMessage = (event) => {
      if (event.data.type === "sandbox:web:healthcheck") {
        window.parent.postMessage(healthyResponse, "*");
      }
    };
    window.addEventListener("message", handleMessage);
    window.parent.postMessage(healthyResponse, "*");
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [isHmrConnected]);
};
const useCodeGen = () => {
  const {
    startCodeGen,
    setCodeGenGenerating,
    completeCodeGen,
    errorCodeGen,
    stopCodeGen
  } = useSandboxStore();
  useEffect(() => {
    const handleMessage = (event) => {
      const {
        type
      } = event.data;
      switch (type) {
        case "sandbox:web:codegen:started":
          startCodeGen();
          break;
        case "sandbox:web:codegen:generating":
          setCodeGenGenerating();
          break;
        case "sandbox:web:codegen:complete":
          completeCodeGen();
          break;
        case "sandbox:web:codegen:error":
          errorCodeGen();
          break;
        case "sandbox:web:codegen:stopped":
          stopCodeGen();
          break;
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [startCodeGen, setCodeGenGenerating, completeCodeGen, errorCodeGen, stopCodeGen]);
};
const useRefresh = () => {
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "sandbox:web:refresh:request") {
        setTimeout(() => {
          window.location.reload();
        }, 1e3);
        window.parent.postMessage({
          type: "sandbox:web:refresh:complete"
        }, "*");
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
};
const waitForScreenshotReady = async () => {
  const images = Array.from(document.images);
  await Promise.all([
    // make sure custom fonts are loaded
    "fonts" in document ? document.fonts.ready : Promise.resolve(),
    ...images.map((img) => new Promise((resolve) => {
      img.crossOrigin = "anonymous";
      if (img.complete) {
        resolve(true);
        return;
      }
      img.onload = () => resolve(true);
      img.onerror = () => resolve(true);
    }))
  ]);
  await new Promise((resolve) => setTimeout(resolve, 250));
};
const useHandleScreenshotRequest = () => {
  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.data.type === "sandbox:web:screenshot:request") {
        try {
          await waitForScreenshotReady();
          const width = window.innerWidth;
          const aspectRatio = 16 / 9;
          const height = Math.floor(width / aspectRatio);
          const dataUrl = await toPng(document.body, {
            cacheBust: true,
            skipFonts: false,
            width,
            height,
            style: {
              // force snapshot sizing
              width: `${width}px`,
              height: `${height}px`,
              margin: "0"
            }
          });
          window.parent.postMessage({
            type: "sandbox:web:screenshot:response",
            dataUrl
          }, "*");
        } catch (error) {
          window.parent.postMessage({
            type: "sandbox:web:screenshot:error",
            error: error instanceof Error ? error.message : String(error)
          }, "*");
        }
      }
    };
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
};
function Layout({
  children
}) {
  useHandshakeParent();
  useCodeGen();
  useRefresh();
  useHandleScreenshotRequest();
  useDevServerHeartbeat();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location?.pathname;
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.type === "sandbox:navigation") {
        navigate(event.data.pathname);
      }
    };
    window.addEventListener("message", handleMessage);
    window.parent.postMessage({
      type: "sandbox:web:ready"
    }, "*");
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [navigate]);
  useEffect(() => {
    if (pathname) {
      window.parent.postMessage({
        type: "sandbox:web:navigation",
        pathname
      }, "*");
    }
  }, [pathname]);
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {}), /* @__PURE__ */ jsx("script", {
        type: "module",
        src: "/src/__create/dev-error-overlay.js"
      }), /* @__PURE__ */ jsx("link", {
        rel: "icon",
        href: "/src/__create/favicon.png"
      }), LoadFontsSSR ? /* @__PURE__ */ jsx(LoadFontsSSR, {}) : null]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx(ClientOnly, {
        loader: () => children
      }), /* @__PURE__ */ jsx(HotReloadIndicator, {}), /* @__PURE__ */ jsx(Toaster, {
        position: "bottom-right"
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {}), /* @__PURE__ */ jsx("script", {
        src: "https://kit.fontawesome.com/2c15cc0cc7.js",
        crossOrigin: "anonymous",
        async: true
      })]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(SessionProvider, {
    children: /* @__PURE__ */ jsx(Outlet, {})
  });
});

const route0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  ClientOnly,
  ErrorBoundary,
  Layout,
  default: root,
  links,
  useHandleScreenshotRequest,
  useHmrConnection
}, Symbol.toStringTag, { value: 'Module' }));

function Logo({
  className = "",
  textClassName = "text-xl font-bold"
}) {
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: `flex flex-row items-center flex-nowrap gap-3 flex-shrink-0 mr-8 pr-4 ${className}`,
    style: {
      width: "280px",
      minWidth: "280px",
      maxWidth: "320px"
    },
    renderId: "render-0c7c8af7",
    as: "div",
    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "bg-blue-600 p-1.5 rounded-lg shadow-sm flex-shrink-0",
      renderId: "render-b1c3a33d",
      as: "div",
      children: /* @__PURE__ */ jsx(Scaling, {
        className: "w-6 h-6 text-white"
      })
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: `bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 whitespace-nowrap flex-shrink-0 leading-none select-none ${textClassName}`,
      renderId: "render-f8937d8b",
      as: "span",
      children: "File Resizer Pro"
    })]
  });
}

function FolderBrowser({
  onFolderSelect,
  selectedFolder
}) {
  const [expandedFolders, setExpandedFolders] = useState(/* @__PURE__ */ new Set());
  const [folderTree, setFolderTree] = useState([]);
  const fileInputRef = useRef(null);
  const handleSelectFolder = async () => {
    try {
      if ("showDirectoryPicker" in window) {
        const directoryHandle = await window.showDirectoryPicker();
        onFolderSelect(directoryHandle);
        setFolderTree([{
          name: directoryHandle.name,
          handle: directoryHandle,
          isExpanded: true,
          children: []
        }]);
      } else {
        fileInputRef.current?.click();
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Error selecting folder:", error);
      }
    }
  };
  const handleFileInputChange = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const mockFolder = {
        name: "Selected Files",
        files: files.filter((file) => {
          const extension = file.name.toLowerCase().slice(file.name.lastIndexOf("."));
          return [".png", ".jpg", ".jpeg", ".tiff", ".tif", ".pdf"].includes(extension);
        }),
        entries: function* () {
          for (const file of this.files) {
            yield [file.name, {
              kind: "file",
              getFile: () => Promise.resolve(file)
            }];
          }
        }
      };
      onFolderSelect(mockFolder);
    }
  };
  const toggleFolder = (folderName) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName);
    } else {
      newExpanded.add(folderName);
    }
    setExpandedFolders(newExpanded);
  };
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "h-full flex flex-col",
    renderId: "render-d99b6bfe",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "p-4 border-b border-gray-200",
      renderId: "render-b3175d12",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-center gap-2 mb-3",
        renderId: "render-b9b4623b",
        as: "div",
        children: [/* @__PURE__ */ jsx(Folder, {
          className: "w-5 h-5 text-blue-600"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "font-medium text-gray-900",
          renderId: "render-ae1e28e8",
          as: "h2",
          children: "Folders"
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        onClick: handleSelectFolder,
        className: "w-full flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
        renderId: "render-9ed39019",
        as: "button",
        children: [/* @__PURE__ */ jsx(HardDrive, {
          className: "w-4 h-4"
        }), "Select Folder"]
      }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        ref: fileInputRef,
        type: "file",
        multiple: true,
        webkitdirectory: "",
        accept: ".png,.jpg,.jpeg,.tiff,.tif,.pdf",
        onChange: handleFileInputChange,
        className: "hidden",
        renderId: "render-940b9d89",
        as: "input"
      })]
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex-1 overflow-auto p-2",
      renderId: "render-77bb648d",
      as: "div",
      children: folderTree.length === 0 ? /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex flex-col items-center justify-center h-full text-center p-6",
        renderId: "render-53c88532",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4",
          renderId: "render-9c2d32fb",
          as: "div",
          children: /* @__PURE__ */ jsx(Folder, {
            className: "w-8 h-8 text-gray-400"
          })
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-gray-500 text-sm mb-2",
          renderId: "render-5f4d90a4",
          as: "p",
          children: "No folder selected"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-xs text-gray-400",
          renderId: "render-87847a99",
          as: "p",
          children: "Choose a folder to begin resizing files"
        })]
      }) : /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "space-y-1",
        renderId: "render-95e28a96",
        as: "div",
        children: folderTree.map((folder, index) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          renderId: "render-834d0bdb",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: `flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${selectedFolder === folder.handle ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50"}`,
            onClick: () => onFolderSelect(folder.handle),
            renderId: "render-14160955",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              onClick: (e) => {
                e.stopPropagation();
                toggleFolder(folder.name);
              },
              className: "p-1",
              renderId: "render-3585a0d4",
              as: "button",
              children: expandedFolders.has(folder.name) ? /* @__PURE__ */ jsx(ChevronDown, {
                className: "w-4 h-4 text-gray-500"
              }) : /* @__PURE__ */ jsx(ChevronRight, {
                className: "w-4 h-4 text-gray-500"
              })
            }), selectedFolder === folder.handle ? /* @__PURE__ */ jsx(FolderOpen, {
              className: "w-4 h-4 text-blue-600"
            }) : /* @__PURE__ */ jsx(Folder, {
              className: "w-4 h-4 text-gray-500"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm font-medium truncate",
              renderId: "render-52574676",
              as: "span",
              children: folder.name
            })]
          })
        }, index))
      })
    }), selectedFolder && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "p-4 border-t border-gray-200 bg-gray-50",
      renderId: "render-d22cbfed",
      as: "div",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "text-xs text-gray-600",
        renderId: "render-fd5f14e7",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "mb-1",
          renderId: "render-b537b6c4",
          as: "p",
          children: "Selected folder:"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "font-medium truncate",
          renderId: "render-7da259d8",
          as: "p",
          children: selectedFolder.name || "Selected Files"
        })]
      })
    })]
  });
}

function FileList({
  files,
  selectedFile,
  onFileSelect,
  sortBy,
  sortOrder,
  onSort
}) {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  const getFileIcon = (fileName) => {
    const extension = fileName.toLowerCase().slice(fileName.lastIndexOf("."));
    if ([".png", ".jpg", ".jpeg", ".tiff", ".tif"].includes(extension)) {
      return /* @__PURE__ */ jsx(FileImage, {
        className: "w-5 h-5 text-blue-500"
      });
    } else if (extension === ".pdf") {
      return /* @__PURE__ */ jsx(FileText, {
        className: "w-5 h-5 text-red-500"
      });
    }
    return /* @__PURE__ */ jsx(FileText, {
      className: "w-5 h-5 text-gray-500"
    });
  };
  const getSortIcon = (field) => {
    if (sortBy !== field) return null;
    return sortOrder === "asc" ? /* @__PURE__ */ jsx(ChevronUp, {
      className: "w-4 h-4"
    }) : /* @__PURE__ */ jsx(ChevronDown, {
      className: "w-4 h-4"
    });
  };
  const formatLastModified = (timestamp) => {
    return new Date(timestamp).toLocaleDateString();
  };
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "h-full flex flex-col",
    renderId: "render-a3014a7e",
    as: "div",
    children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "p-4 border-b border-gray-200 bg-gray-50",
      renderId: "render-4531e408",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-center justify-between mb-3",
        renderId: "render-5bbc8173",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "font-medium text-gray-900",
          renderId: "render-b3e28ba8",
          as: "h2",
          children: "Files"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "text-sm text-gray-500",
          renderId: "render-0b8ef93d",
          as: "span",
          children: [files.length, " files"]
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wide",
        renderId: "render-f017c5f9",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "col-span-5 flex items-center gap-1 cursor-pointer hover:text-gray-700",
          onClick: () => onSort("name"),
          renderId: "render-531c2dcf",
          as: "div",
          children: ["Name", getSortIcon("name")]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "col-span-3 flex items-center gap-1 cursor-pointer hover:text-gray-700",
          onClick: () => onSort("size"),
          renderId: "render-6b5f4c0e",
          as: "div",
          children: ["Size", getSortIcon("size")]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "col-span-2",
          renderId: "render-75e2c1a2",
          as: "div",
          children: "Type"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "col-span-2",
          renderId: "render-d3eac48b",
          as: "div",
          children: "Modified"
        })]
      })]
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex-1 overflow-auto",
      renderId: "render-6da9a977",
      as: "div",
      children: files.length === 0 ? /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex flex-col items-center justify-center h-full text-center p-6",
        renderId: "render-df531470",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4",
          renderId: "render-ae38e166",
          as: "div",
          children: /* @__PURE__ */ jsx(FileImage, {
            className: "w-8 h-8 text-gray-400"
          })
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-gray-500 text-sm mb-2",
          renderId: "render-69121cb9",
          as: "p",
          children: "No files found"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-xs text-gray-400",
          renderId: "render-215d14b3",
          as: "p",
          children: "Select a folder containing images or PDFs to get started"
        })]
      }) : /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "divide-y divide-gray-100",
        renderId: "render-db81c97c",
        as: "div",
        children: files.map((file, index) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: `grid grid-cols-12 gap-4 p-3 cursor-pointer transition-colors ${selectedFile === file ? "bg-blue-50 border-l-4 border-l-blue-500" : "hover:bg-gray-50"}`,
          onClick: () => onFileSelect(file),
          renderId: "render-b23f92a7",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "col-span-5 flex items-center gap-3 min-w-0",
            renderId: "render-cb48c10a",
            as: "div",
            children: [getFileIcon(file.name), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm font-medium text-gray-900 truncate",
              renderId: "render-aedfe746",
              as: "span",
              children: file.name
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "col-span-3 flex items-center",
            renderId: "render-56f63693",
            as: "div",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-gray-600",
              renderId: "render-108011e6",
              as: "span",
              children: formatFileSize(file.size)
            })
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "col-span-2 flex items-center",
            renderId: "render-11b5d24c",
            as: "div",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-gray-500 uppercase",
              renderId: "render-b2c421bf",
              as: "span",
              children: file.name.split(".").pop()
            })
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "col-span-2 flex items-center",
            renderId: "render-7f43db27",
            as: "div",
            children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-gray-500",
              renderId: "render-74689148",
              as: "span",
              children: formatLastModified(file.lastModified)
            })
          })]
        }, index))
      })
    }), selectedFile && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "p-4 border-t border-gray-200 bg-blue-50",
      renderId: "render-566c164e",
      as: "div",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "text-sm",
        renderId: "render-52805af6",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "font-medium text-blue-900 truncate",
          renderId: "render-6ea7ddf2",
          as: "p",
          children: selectedFile.name
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-blue-700",
          renderId: "render-593b3433",
          as: "p",
          children: formatFileSize(selectedFile.size)
        })]
      })
    })]
  });
}

function PreviewPanel({
  selectedFile,
  resizeSettings,
  onResize,
  onNext
}) {
  const [originalPreview, setOriginalPreview] = useState(null);
  const [resizedPreview, setResizedPreview] = useState(null);
  const [estimatedSize, setEstimatedSize] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  useRef(null);
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  const getSavingsPercent = () => {
    if (!selectedFile || !estimatedSize) return 0;
    return Math.round((1 - estimatedSize / selectedFile.size) * 100);
  };
  useEffect(() => {
    if (!selectedFile) {
      setOriginalPreview(null);
      setResizedPreview(null);
      setEstimatedSize(null);
      return;
    }
    const loadPreview = async () => {
      try {
        const url = URL.createObjectURL(selectedFile.file);
        setOriginalPreview(url);
        if (selectedFile.file.type.startsWith("image/")) {
          await generateResizedPreview(selectedFile.file);
        } else if (selectedFile.file.type === "application/pdf") {
          setResizedPreview(url);
          const compressionLevel = resizeSettings.quality || 80;
          let compressionFactor = 0;
          if (compressionLevel < 30) {
            compressionFactor = 0.4;
          } else if (compressionLevel < 60) {
            compressionFactor = 0.25;
          } else if (compressionLevel < 90) {
            compressionFactor = 0.15;
          } else {
            compressionFactor = 0.05;
          }
          const compressedSize = Math.floor(selectedFile.file.size * (1 - compressionFactor));
          setEstimatedSize(compressedSize);
        }
      } catch (error) {
        console.error("Error loading preview:", error);
      }
    };
    loadPreview();
    return () => {
      if (originalPreview) {
        URL.revokeObjectURL(originalPreview);
      }
      if (resizedPreview && resizedPreview !== originalPreview) {
        URL.revokeObjectURL(resizedPreview);
      }
    };
  }, [selectedFile, resizeSettings]);
  const generateResizedPreview = async (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        let {
          width: newWidth,
          height: newHeight
        } = calculateDimensions(img.width, img.height, resizeSettings.maxWidth, resizeSettings.maxHeight);
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          setResizedPreview(url);
          setEstimatedSize(blob.size);
          resolve();
        }, file.type, resizeSettings.quality / 100);
      };
      img.src = URL.createObjectURL(file);
    });
  };
  const calculateDimensions = (originalWidth, originalHeight, maxWidth, maxHeight) => {
    let width = originalWidth;
    let height = originalHeight;
    const scaleX = maxWidth / width;
    const scaleY = maxHeight / height;
    const scale = Math.min(scaleX, scaleY, 1);
    return {
      width: Math.round(width * scale),
      height: Math.round(height * scale)
    };
  };
  const handleResize = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    try {
      const result = await onResize(selectedFile, resizeSettings);
      if (result.success) {
        const compressionApplied = result.headers?.get("X-Compression-Applied") === "true";
        if (isPDF && !compressionApplied) {
          console.log("PDF processed but compression was not applied to preserve file integrity.");
        } else {
          console.log("Processing completed successfully!");
        }
        setTimeout(() => {
          onNext();
          setIsProcessing(false);
        }, 1500);
      }
    } catch (error) {
      console.error("Error processing file:", error);
      let errorMessage;
      if (isPDF) {
        if (error.message.includes("Invalid PDF file")) {
          errorMessage = `The selected file (${selectedFile.name}) is not a valid PDF. Please select a different file.`;
        } else if (error.message.includes("PDF processing failed")) {
          errorMessage = `Unable to process ${selectedFile.name}. The PDF may be password-protected or corrupted.`;
        } else if (error.message.includes("network")) {
          errorMessage = "Network error. Please check your connection and try again.";
        } else {
          errorMessage = `Processing failed: ${error.message}`;
        }
      } else {
        errorMessage = error.message.includes("Failed to resize file") ? `Unable to process ${selectedFile.name}. Please try a different file.` : error.message.includes("network") ? "Network error. Please check your connection and try again." : `Failed to process file: ${error.message}`;
      }
      alert(errorMessage);
      setIsProcessing(false);
    }
  };
  const isImage = selectedFile?.file?.type?.startsWith("image/");
  const isPDF = selectedFile?.file?.type === "application/pdf";
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "h-full flex flex-col",
    renderId: "render-9d76a97c",
    as: "div",
    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "p-4 border-b border-gray-200",
      renderId: "render-8d3cf387",
      as: "div",
      children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-center gap-2 mb-3",
        renderId: "render-889a8551",
        as: "div",
        children: [/* @__PURE__ */ jsx(Eye, {
          className: "w-5 h-5 text-blue-600"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "font-medium text-gray-900",
          renderId: "render-e1f95f46",
          as: "h2",
          children: "Preview"
        })]
      })
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "flex-1 overflow-auto",
      renderId: "render-b82e8428",
      as: "div",
      children: !selectedFile ? /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex flex-col items-center justify-center h-full text-center p-6",
        renderId: "render-a03ef6e8",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4",
          renderId: "render-68777e33",
          as: "div",
          children: /* @__PURE__ */ jsx(Eye, {
            className: "w-8 h-8 text-gray-400"
          })
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-gray-500 text-sm mb-2",
          renderId: "render-f92bacec",
          as: "p",
          children: "No file selected"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-xs text-gray-400",
          renderId: "render-66f48600",
          as: "p",
          children: "Select a file to preview and resize"
        })]
      }) : /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "p-4 space-y-6",
        renderId: "render-395c3a63",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "space-y-3",
          renderId: "render-de182e0d",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-center justify-between",
            renderId: "render-effaefae",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm font-medium text-gray-900",
              renderId: "render-6b90a0d3",
              as: "h3",
              children: "Original"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-gray-500",
              renderId: "render-a4c469c2",
              as: "span",
              children: formatFileSize(selectedFile.size)
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "bg-gray-50 rounded-lg p-4 min-h-[200px] flex items-center justify-center",
            renderId: "render-da2192a1",
            as: "div",
            children: isImage && originalPreview ? /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              src: originalPreview,
              alt: "Original preview",
              className: "max-w-full max-h-48 object-contain rounded",
              renderId: "render-3ecb76e9",
              as: "img"
            }) : isPDF && originalPreview ? /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "w-full h-48 border border-gray-200 rounded bg-white",
              renderId: "render-74225d19",
              as: "div",
              children: /* @__PURE__ */ jsx("embed", {
                src: originalPreview,
                type: "application/pdf",
                width: "100%",
                height: "100%",
                className: "rounded"
              })
            }) : isPDF ? /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-center",
              renderId: "render-9fb06b93",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2",
                renderId: "render-24b2db7e",
                as: "div",
                children: /* @__PURE__ */ jsx(Download, {
                  className: "w-8 h-8 text-red-500"
                })
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-sm text-gray-600",
                renderId: "render-300f15fe",
                as: "p",
                children: selectedFile.name
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-xs text-gray-500",
                renderId: "render-0817f73e",
                as: "p",
                children: "Loading PDF Preview..."
              })]
            }) : /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-center text-gray-500",
              renderId: "render-240614a1",
              as: "div",
              children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-sm",
                renderId: "render-44234fa8",
                as: "p",
                children: "Preview not available"
              })
            })
          })]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "flex justify-center",
          renderId: "render-8e18dc76",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full",
            renderId: "render-af64abd9",
            as: "div",
            children: [/* @__PURE__ */ jsx(ArrowRight, {
              className: "w-4 h-4 text-blue-600"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xs font-medium text-blue-700",
              renderId: "render-f0adb7b3",
              as: "span",
              children: isPDF ? "Compress" : "Resize"
            })]
          })
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "space-y-3",
          renderId: "render-f8f4c9de",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-center justify-between",
            renderId: "render-ed1ca8f5",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm font-medium text-gray-900",
              renderId: "render-a90e6b8d",
              as: "h3",
              children: "After Resize"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-sm text-gray-500",
              renderId: "render-36ced2df",
              as: "span",
              children: estimatedSize ? formatFileSize(estimatedSize) : "Calculating..."
            })]
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "bg-gray-50 rounded-lg p-4 min-h-[200px] flex items-center justify-center",
            renderId: "render-49dc2b2c",
            as: "div",
            children: isImage && resizedPreview ? /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              src: resizedPreview,
              alt: "Resized preview",
              className: "max-w-full max-h-48 object-contain rounded",
              renderId: "render-56b26019",
              as: "img"
            }) : isPDF && resizedPreview ? /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "w-full h-48 border border-gray-200 rounded bg-white relative",
              renderId: "render-0d9f1a50",
              as: "div",
              children: [/* @__PURE__ */ jsx("embed", {
                src: resizedPreview,
                type: "application/pdf",
                width: "100%",
                height: "100%",
                className: "rounded"
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium",
                renderId: "render-cf8fe678",
                as: "div",
                children: "Compressed"
              })]
            }) : isPDF ? /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-center",
              renderId: "render-a43ec8ba",
              as: "div",
              children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2",
                renderId: "render-f3dd6e43",
                as: "div",
                children: /* @__PURE__ */ jsx(Download, {
                  className: "w-8 h-8 text-red-500"
                })
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-sm text-gray-600",
                renderId: "render-f2428d90",
                as: "p",
                children: selectedFile.name
              }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-xs text-gray-500",
                renderId: "render-dcde8fa2",
                as: "p",
                children: "PDF will be compressed"
              })]
            }) : /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-center text-gray-500",
              renderId: "render-69d3b147",
              as: "div",
              children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
                className: "text-sm",
                renderId: "render-57499e2c",
                as: "p",
                children: "Preview generating..."
              })
            })
          })]
        }), estimatedSize && getSavingsPercent() > 0 && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-green-50 rounded-lg p-4",
          renderId: "render-5e29c98c",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm font-medium text-green-900 mb-2",
            renderId: "render-91d64bf7",
            as: "h4",
            children: "Size Savings"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex justify-between items-center text-sm",
            renderId: "render-7d298b06",
            as: "div",
            children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-green-700",
              renderId: "render-6fb62d6e",
              as: "span",
              children: [formatFileSize(selectedFile.size - estimatedSize), " saved"]
            }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
              className: "text-green-700 font-medium",
              renderId: "render-7eb897cc",
              as: "span",
              children: [getSavingsPercent(), "% reduction"]
            })]
          })]
        }), isPDF && estimatedSize && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "bg-blue-50 rounded-lg p-4",
          renderId: "render-90113d7c",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm font-medium text-blue-900 mb-2",
            renderId: "render-fac137a2",
            as: "h4",
            children: "PDF Compression"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm text-blue-700",
            renderId: "render-b5984860",
            as: "p",
            children: "PDF compression will reduce file size while preserving all content and ensuring compatibility. The compressed PDF will maintain text, images, and layout quality."
          })]
        })]
      })
    }), selectedFile && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "p-4 border-t border-gray-200 space-y-3",
      renderId: "render-b52626ab",
      as: "div",
      children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        onClick: handleResize,
        disabled: isProcessing,
        className: `w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${isProcessing ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`,
        renderId: "render-28235aa9",
        as: "button",
        children: isProcessing ? /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin",
            renderId: "render-28b51049",
            as: "div"
          }), "Processing..."]
        }) : /* @__PURE__ */ jsxs(Fragment, {
          children: [/* @__PURE__ */ jsx(Download, {
            className: "w-4 h-4"
          }), isPDF ? "Compress & Save" : "Resize & Save"]
        })
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex gap-2",
        renderId: "render-91759e73",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: onNext,
          className: "flex-1 px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors",
          renderId: "render-a0445266",
          as: "button",
          children: "Skip"
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          onClick: () => window.location.reload(),
          className: "px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors",
          renderId: "render-670c8dfc",
          as: "button",
          children: /* @__PURE__ */ jsx(RotateCcw, {
            className: "w-4 h-4"
          })
        })]
      })]
    })]
  });
}

function SearchBar({
  value,
  onChange,
  placeholder = "Search..."
}) {
  const handleClear = () => {
    onChange("");
  };
  return /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
    className: "relative",
    renderId: "render-94466d50",
    as: "div",
    children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
      renderId: "render-c4840288",
      as: "div",
      children: /* @__PURE__ */ jsx(Search, {
        className: "w-4 h-4 text-gray-400"
      })
    }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      type: "text",
      value,
      onChange: (e) => onChange(e.target.value),
      placeholder,
      className: "w-64 pl-10 pr-10 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
      renderId: "render-9618961e",
      as: "input"
    }), value && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
      onClick: handleClear,
      className: "absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600",
      renderId: "render-36c18d00",
      as: "button",
      children: /* @__PURE__ */ jsx(X, {
        className: "w-4 h-4"
      })
    })]
  });
}

function FilterPanel({
  sizeFilter,
  setSizeFilter,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  resizeSettings,
  setResizeSettings
}) {
  const sizePresets = [{
    label: "All Files",
    min: 0,
    max: Infinity
  }, {
    label: "Small (< 1MB)",
    min: 0,
    max: 1024 * 1024
  }, {
    label: "Medium (1-10MB)",
    min: 1024 * 1024,
    max: 10 * 1024 * 1024
  }, {
    label: "Large (> 10MB)",
    min: 10 * 1024 * 1024,
    max: Infinity
  }];
  const qualityPresets = [{
    label: "High Quality (90%)",
    value: 90
  }, {
    label: "Good Quality (80%)",
    value: 80
  }, {
    label: "Medium Quality (70%)",
    value: 70
  }, {
    label: "Low Quality (60%)",
    value: 60
  }];
  const dimensionPresets = [{
    label: "4K (3840x2160)",
    width: 3840,
    height: 2160
  }, {
    label: "Full HD (1920x1080)",
    width: 1920,
    height: 1080
  }, {
    label: "HD (1280x720)",
    width: 1280,
    height: 720
  }, {
    label: "Mobile (800x600)",
    width: 800,
    height: 600
  }, {
    label: "Custom",
    width: 0,
    height: 0
  }];
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "bg-white border-b border-gray-200 p-4",
    renderId: "render-3b4b83ff",
    as: "div",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6",
      renderId: "render-8d89ae56",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "space-y-3",
        renderId: "render-420b7d8a",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center gap-2",
          renderId: "render-5fe16f0e",
          as: "div",
          children: [/* @__PURE__ */ jsx(ArrowUpDown, {
            className: "w-4 h-4 text-gray-500"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm font-medium text-gray-900",
            renderId: "render-50cda561",
            as: "h3",
            children: "File Size Filter"
          })]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "space-y-2",
          renderId: "render-95d2eaa6",
          as: "div",
          children: sizePresets.map((preset, index) => /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-center",
            renderId: "render-f3ec72ff",
            as: "label",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "radio",
              name: "sizeFilter",
              checked: sizeFilter.min === preset.min && sizeFilter.max === preset.max,
              onChange: () => setSizeFilter({
                min: preset.min,
                max: preset.max
              }),
              className: "w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500",
              renderId: "render-966a734c",
              as: "input"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "ml-2 text-sm text-gray-700",
              renderId: "render-b3f7efc3",
              as: "span",
              children: preset.label
            })]
          }, index))
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "space-y-3",
        renderId: "render-695a206b",
        as: "div",
        children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "text-sm font-medium text-gray-900",
          renderId: "render-56aff0a8",
          as: "h3",
          children: "Sort By"
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "space-y-2",
          renderId: "render-6e5fc2a7",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-center",
            renderId: "render-d8434961",
            as: "label",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "radio",
              name: "sortBy",
              value: "name",
              checked: sortBy === "name",
              onChange: (e) => setSortBy(e.target.value),
              className: "w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500",
              renderId: "render-043181a6",
              as: "input"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "ml-2 text-sm text-gray-700",
              renderId: "render-318e50a9",
              as: "span",
              children: "Name"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-center",
            renderId: "render-f9088cf5",
            as: "label",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "radio",
              name: "sortBy",
              value: "size",
              checked: sortBy === "size",
              onChange: (e) => setSortBy(e.target.value),
              className: "w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500",
              renderId: "render-2c0f14dd",
              as: "input"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "ml-2 text-sm text-gray-700",
              renderId: "render-2577b305",
              as: "span",
              children: "File Size"
            })]
          })]
        }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "pt-2",
          renderId: "render-478e8151",
          as: "div",
          children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "flex items-center",
            renderId: "render-8c646556",
            as: "label",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "checkbox",
              checked: sortOrder === "desc",
              onChange: (e) => setSortOrder(e.target.checked ? "desc" : "asc"),
              className: "w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500",
              renderId: "render-7c6195bf",
              as: "input"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "ml-2 text-sm text-gray-700",
              renderId: "render-e59ec5be",
              as: "span",
              children: "Descending order"
            })]
          })
        })]
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "space-y-3",
        renderId: "render-d1bd0628",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center gap-2",
          renderId: "render-f159a9a3",
          as: "div",
          children: [/* @__PURE__ */ jsx(Settings, {
            className: "w-4 h-4 text-gray-500"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-sm font-medium text-gray-900",
            renderId: "render-460eeb25",
            as: "h3",
            children: "Resize Settings"
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "space-y-2",
          renderId: "render-8d9f0e6d",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xs font-medium text-gray-700",
            renderId: "render-cdc79fef",
            as: "label",
            children: "Quality"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            value: resizeSettings.quality,
            onChange: (e) => setResizeSettings({
              ...resizeSettings,
              quality: parseInt(e.target.value)
            }),
            className: "w-full text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500",
            renderId: "render-eaef62d6",
            as: "select",
            children: qualityPresets.map((preset, index) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              value: preset.value,
              renderId: "render-60f88a1b",
              as: "option",
              children: preset.label
            }, index))
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "space-y-2",
          renderId: "render-7dbbe90b",
          as: "div",
          children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "text-xs font-medium text-gray-700",
            renderId: "render-0452c56d",
            as: "label",
            children: "Max Dimensions"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            onChange: (e) => {
              const preset = dimensionPresets[parseInt(e.target.value)];
              setResizeSettings({
                ...resizeSettings,
                maxWidth: preset.width || resizeSettings.maxWidth,
                maxHeight: preset.height || resizeSettings.maxHeight
              });
            },
            className: "w-full text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500",
            renderId: "render-b02dbef9",
            as: "select",
            children: dimensionPresets.map((preset, index) => /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              value: index,
              renderId: "render-2d950236",
              as: "option",
              children: preset.label
            }, index))
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "grid grid-cols-2 gap-2",
          renderId: "render-1aa6e2dc",
          as: "div",
          children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-f8c138ae",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xs text-gray-600",
              renderId: "render-ae7c6743",
              as: "label",
              children: "Width"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "number",
              value: resizeSettings.maxWidth,
              onChange: (e) => setResizeSettings({
                ...resizeSettings,
                maxWidth: parseInt(e.target.value) || 1920
              }),
              className: "w-full text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500",
              min: "100",
              max: "10000",
              renderId: "render-9556cc49",
              as: "input"
            })]
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            renderId: "render-e5d70ff9",
            as: "div",
            children: [/* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              className: "text-xs text-gray-600",
              renderId: "render-21e0eca6",
              as: "label",
              children: "Height"
            }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
              type: "number",
              value: resizeSettings.maxHeight,
              onChange: (e) => setResizeSettings({
                ...resizeSettings,
                maxHeight: parseInt(e.target.value) || 1080
              }),
              className: "w-full text-sm border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500",
              min: "100",
              max: "10000",
              renderId: "render-c040bcef",
              as: "input"
            })]
          })]
        })]
      })]
    })
  });
}

function StatusBar({
  totalFiles,
  filteredFiles,
  totalSavings,
  processedCount
}) {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  const getProgressPercent = () => {
    if (filteredFiles === 0) return 0;
    return Math.round(processedCount / filteredFiles * 100);
  };
  return /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
    className: "bg-white border-t border-gray-200 px-4 py-3",
    renderId: "render-189e883a",
    as: "div",
    children: /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
      className: "flex items-center justify-between",
      renderId: "render-5c549e30",
      as: "div",
      children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-center gap-6",
        renderId: "render-7bb44fd9",
        as: "div",
        children: [/* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center gap-2",
          renderId: "render-6d46be98",
          as: "div",
          children: [/* @__PURE__ */ jsx(FileImage, {
            className: "w-4 h-4 text-gray-500"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-sm text-gray-600",
            renderId: "render-014c329e",
            as: "span",
            children: [filteredFiles, " of ", totalFiles, " files shown"]
          })]
        }), processedCount > 0 && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center gap-2",
          renderId: "render-2d0b8bfa",
          as: "div",
          children: [/* @__PURE__ */ jsx(CheckCircle, {
            className: "w-4 h-4 text-green-500"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-sm text-gray-600",
            renderId: "render-29b0b6b5",
            as: "span",
            children: [processedCount, " processed (", getProgressPercent(), "%)"]
          })]
        })]
      }), processedCount > 0 && filteredFiles > 0 && /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
        className: "flex-1 max-w-xs mx-8",
        renderId: "render-2489f201",
        as: "div",
        children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
          className: "w-full bg-gray-200 rounded-full h-2",
          renderId: "render-363dd46f",
          as: "div",
          children: /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            className: "bg-blue-500 h-2 rounded-full transition-all duration-300",
            style: {
              width: `${getProgressPercent()}%`
            },
            renderId: "render-26f8d774",
            as: "div"
          })
        })
      }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
        className: "flex items-center gap-6",
        renderId: "render-970d9bd4",
        as: "div",
        children: [totalSavings > 0 && /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center gap-2",
          renderId: "render-4661d2d1",
          as: "div",
          children: [/* @__PURE__ */ jsx(TrendingDown, {
            className: "w-4 h-4 text-green-500"
          }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
            className: "text-sm text-gray-600",
            renderId: "render-40253c84",
            as: "span",
            children: [formatFileSize(totalSavings), " saved"]
          })]
        }), /* @__PURE__ */ jsxs(CreatePolymorphicComponent, {
          className: "flex items-center gap-2 text-xs text-gray-500",
          renderId: "render-16e48a83",
          as: "div",
          children: [/* @__PURE__ */ jsx(Clock, {
            className: "w-3 h-3"
          }), /* @__PURE__ */ jsx(CreatePolymorphicComponent, {
            renderId: "render-711d5423",
            as: "span",
            children: "Ready"
          })]
        })]
      })]
    })
  });
}

const page = UNSAFE_withComponentProps(function FileResizerApp() {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sizeFilter, setSizeFilter] = useState({
    min: 0,
    max: Infinity
  });
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showFilters, setShowFilters] = useState(false);
  const [resizeSettings, setResizeSettings] = useState({
    quality: 80,
    maxWidth: 1920,
    maxHeight: 1080,
    format: "original"
  });
  const [totalSavings, setTotalSavings] = useState(0);
  const [processedCount, setProcessedCount] = useState(0);
  const supportedTypes = [".png", ".jpg", ".jpeg", ".tiff", ".tif", ".pdf"];
  const handleFolderSelect = useCallback(async folderHandle => {
    setSelectedFolder(folderHandle);
    setSelectedFile(null);
    setTotalSavings(0);
    setProcessedCount(0);
    try {
      const fileList = [];
      for await (const [name, handle] of folderHandle.entries()) {
        if (handle.kind === "file") {
          const extension = name.toLowerCase().slice(name.lastIndexOf("."));
          if (supportedTypes.includes(extension)) {
            const file = await handle.getFile();
            fileList.push({
              name: file.name,
              size: file.size,
              type: file.type,
              lastModified: file.lastModified,
              handle,
              file
            });
          }
        }
      }
      setFiles(fileList);
    } catch (error) {
      console.error("Error reading folder:", error);
    }
  }, []);
  const filteredAndSortedFiles = useCallback(() => {
    let filtered = files.filter(file => {
      const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSize = file.size >= sizeFilter.min && file.size <= sizeFilter.max;
      return matchesSearch && matchesSize;
    });
    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === "size") {
        comparison = a.size - b.size;
      }
      return sortOrder === "desc" ? -comparison : comparison;
    });
    return filtered;
  }, [files, searchTerm, sizeFilter, sortBy, sortOrder]);
  const handleFileSelect = file => {
    setSelectedFile(file);
  };
  const handleResize = async (file, settings) => {
    try {
      const formData = new FormData();
      formData.append("file", file.file);
      formData.append("settings", JSON.stringify(settings));
      const response = await fetch("/api/resize-file", {
        method: "POST",
        body: formData
      });
      if (!response.ok) {
        throw new Error(`Resize failed: ${response.statusText}`);
      }
      const originalSize = parseInt(response.headers.get("X-Original-Size") || "0");
      const newSize = parseInt(response.headers.get("X-New-Size") || "0");
      const savings = parseInt(response.headers.get("X-Savings") || "0");
      const backupName = response.headers.get("X-Backup-Name") || "";
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const downloadLink = document.createElement("a");
      downloadLink.href = downloadUrl;
      downloadLink.download = file.name;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      window.URL.revokeObjectURL(downloadUrl);
      setTotalSavings(prev => prev + savings);
      setProcessedCount(prev => prev + 1);
      console.log("File resized successfully:", {
        originalName: file.name,
        backupName,
        originalSize,
        newSize,
        savings
      });
      return {
        success: true,
        originalSize,
        newSize,
        savings,
        backupName
      };
    } catch (error) {
      console.error("Error resizing file:", error);
      throw error;
    }
  };
  return /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
    className: "flex flex-col h-screen bg-gray-50",
    renderId: "render-452aead7",
    as: "div",
    children: [/* @__PURE__ */jsxs(CreatePolymorphicComponent, {
      className: "flex items-center justify-between p-4 bg-white border-b border-gray-200 shadow-sm",
      renderId: "render-32b11739",
      as: "div",
      children: [/* @__PURE__ */jsxs(CreatePolymorphicComponent, {
        className: "flex items-center gap-4",
        renderId: "render-fe12e3d8",
        as: "div",
        children: [/* @__PURE__ */jsx(Logo, {}), /* @__PURE__ */jsx(SearchBar, {
          value: searchTerm,
          onChange: setSearchTerm,
          placeholder: "Search files..."
        })]
      }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "flex items-center gap-2",
        renderId: "render-59a3f423",
        as: "div",
        children: /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
          onClick: () => setShowFilters(!showFilters),
          className: `flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${showFilters ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"}`,
          renderId: "render-02ef6ae4",
          as: "button",
          children: [/* @__PURE__ */jsx(SlidersHorizontal, {
            className: "w-4 h-4"
          }), "Filters"]
        })
      })]
    }), showFilters && /* @__PURE__ */jsx(FilterPanel, {
      sizeFilter,
      setSizeFilter,
      sortBy,
      setSortBy,
      sortOrder,
      setSortOrder,
      resizeSettings,
      setResizeSettings
    }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
      className: "flex flex-1 overflow-hidden",
      renderId: "render-9591dae2",
      as: "div",
      children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "w-80 bg-white border-r border-gray-200 overflow-hidden",
        renderId: "render-b2febe0f",
        as: "div",
        children: /* @__PURE__ */jsx(FolderBrowser, {
          onFolderSelect: handleFolderSelect,
          selectedFolder
        })
      }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "flex-1 bg-white border-r border-gray-200 overflow-hidden",
        renderId: "render-77f71a2d",
        as: "div",
        children: /* @__PURE__ */jsx(FileList, {
          files: filteredAndSortedFiles(),
          selectedFile,
          onFileSelect: handleFileSelect,
          sortBy,
          sortOrder,
          onSort: field => {
            if (sortBy === field) {
              setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            } else {
              setSortBy(field);
              setSortOrder("asc");
            }
          }
        })
      }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "w-96 bg-white overflow-hidden",
        renderId: "render-fa97b09b",
        as: "div",
        children: /* @__PURE__ */jsx(PreviewPanel, {
          selectedFile,
          resizeSettings,
          onResize: handleResize,
          onNext: () => {
            const currentIndex = filteredAndSortedFiles().findIndex(f => f === selectedFile);
            const nextFile = filteredAndSortedFiles()[currentIndex + 1];
            if (nextFile) {
              setSelectedFile(nextFile);
            }
          }
        })
      })]
    }), /* @__PURE__ */jsx(StatusBar, {
      totalFiles: files.length,
      filteredFiles: filteredAndSortedFiles().length,
      totalSavings,
      processedCount
    })]
  });
});

const route1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: page
}, Symbol.toStringTag, { value: 'Module' }));

async function loader({
  params
}) {
  const matches = await fg("src/app/**/page.{js,jsx,ts,tsx}");
  const rawPath = params["*"] || "";
  const path = rawPath === "undefined" ? "/" : `/${rawPath}`;
  return {
    path,
    pages: matches.sort((a, b) => a.length - b.length).map(match => {
      const url = match.replace("src/app", "").replace(/\/page\.(js|jsx|ts|tsx)$/, "") || "/";
      const path2 = url.replaceAll("[", "").replaceAll("]", "");
      const displayPath = path2 === "/" ? "Homepage" : path2;
      return {
        url,
        path: displayPath
      };
    })
  };
}
const notFound = UNSAFE_withComponentProps(function CreateDefaultNotFoundPage({
  loaderData
}) {
  const [siteMap, setSitemap] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof window !== "undefined" && window.parent && window.parent !== window) {
      const handler = event => {
        if (event.data.type === "sandbox:sitemap") {
          window.removeEventListener("message", handler);
          setSitemap(event.data.sitemap);
        }
      };
      window.parent.postMessage({
        type: "sandbox:sitemap"
      }, "*");
      window.addEventListener("message", handler);
      return () => {
        window.removeEventListener("message", handler);
      };
    }
  }, []);
  const missingPath = loaderData.path.replace(/^\//, "");
  const existingRoutes = loaderData.pages.map(page => ({
    path: page.path,
    url: page.url
  }));
  const handleBack = () => {
    navigate("/");
  };
  const handleSearch = value => {
    if (!siteMap) {
      const path = `/${value}`;
      navigate(path);
    } else {
      navigate(value);
    }
  };
  const handleCreatePage = useCallback(() => {
    window.parent.postMessage({
      type: "sandbox:web:create",
      path: missingPath,
      view: "web"
    }, "*");
  }, [missingPath]);
  return /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
    className: "flex sm:w-full w-screen sm:min-w-[850px] flex-col",
    renderId: "render-8d28e6fa",
    as: "div",
    children: [/* @__PURE__ */jsxs(CreatePolymorphicComponent, {
      className: "flex w-full items-center gap-2 p-5",
      renderId: "render-33615766",
      as: "div",
      children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
        type: "button",
        onClick: handleBack,
        className: "flex items-center justify-center w-10 h-10 rounded-md",
        renderId: "render-bd7cb8ce",
        as: "button",
        children: /* @__PURE__ */jsxs("svg", {
          width: "18",
          height: "18",
          viewBox: "0 0 18 18",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          "aria-label": "Back",
          role: "img",
          children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
            d: "M8.5957 2.65435L2.25005 9L8.5957 15.3457",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            renderId: "render-a8e5d31c",
            as: "path"
          }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            d: "M2.25007 9L15.75 9",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            renderId: "render-b2b39a6a",
            as: "path"
          })]
        })
      }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
        className: "flex flex-row divide-x divide-gray-200 rounded-[8px] h-8 w-[300px] border border-gray-200 bg-gray-50 text-gray-500",
        renderId: "render-761eec90",
        as: "div",
        children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex items-center px-[14px] py-[5px]",
          renderId: "render-6885bb1a",
          as: "div",
          children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            renderId: "render-843f97d2",
            as: "span",
            children: "/"
          })
        }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex items-center min-w-0",
          renderId: "render-552d83b6",
          as: "div",
          children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            className: "border-0 bg-transparent px-3 py-2 focus:outline-none truncate max-w-[300px]",
            style: {
              minWidth: 0
            },
            title: missingPath,
            renderId: "render-ac96ce0f",
            as: "p",
            children: missingPath
          })
        })]
      })]
    }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
      className: "flex flex-grow flex-col items-center justify-center pt-[100px] text-center gap-[20px]",
      renderId: "render-34d662f1",
      as: "div",
      children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "text-4xl font-medium text-gray-900 px-2",
        renderId: "render-046c1dab",
        as: "h1",
        children: "Uh-oh! This page doesn't exist (yet)."
      }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
        className: "pt-4 pb-12 px-2 text-gray-500",
        renderId: "render-a790c40c",
        as: "p",
        children: ['Looks like "', /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
          className: "font-bold",
          renderId: "render-9bc0e863",
          as: "span",
          children: ["/", missingPath]
        }), `" isn't part of your project. But no worries, you've got options!`]
      }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "px-[20px] w-full",
        renderId: "render-8af242fc",
        as: "div",
        children: /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
          className: "flex flex-row justify-center items-center w-full max-w-[800px] mx-auto border border-gray-200 rounded-lg p-[20px] mb-[40px] gap-[20px]",
          renderId: "render-cd81d09e",
          as: "div",
          children: [/* @__PURE__ */jsxs(CreatePolymorphicComponent, {
            className: "flex flex-col gap-[5px] items-start self-start w-1/2",
            renderId: "render-2b677ba3",
            as: "div",
            children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "text-sm text-black text-left",
              renderId: "render-d1fba269",
              as: "p",
              children: "Build it from scratch"
            }), /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
              className: "text-sm text-gray-500 text-left",
              renderId: "render-40ada3d2",
              as: "p",
              children: ['Create a new page to live at "', /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
                renderId: "render-2fd2f93e",
                as: "span",
                children: ["/", missingPath]
              }), '"']
            })]
          }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
            className: "flex flex-row items-center justify-end w-1/2",
            renderId: "render-01268ccf",
            as: "div",
            children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
              type: "button",
              className: "bg-black text-white px-[10px] py-[5px] rounded-md",
              onClick: () => handleCreatePage(),
              renderId: "render-26baed54",
              as: "button",
              children: "Create Page"
            })
          })]
        })
      }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "pb-20 lg:pb-[80px]",
        renderId: "render-28f9a716",
        as: "div",
        children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex items-center text-gray-500",
          renderId: "render-23c72daf",
          as: "p",
          children: "Check out all your project's routes here ↓"
        })
      }), siteMap ? /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "flex flex-col justify-center items-center w-full px-[50px]",
        renderId: "render-ea6c72e1",
        as: "div",
        children: /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
          className: "flex flex-col justify-between items-center w-full max-w-[600px] gap-[10px]",
          renderId: "render-b81b99dc",
          as: "div",
          children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
            className: "text-sm text-gray-300 pb-[10px] self-start p-4",
            renderId: "render-4c5ae967",
            as: "p",
            children: "PAGES"
          }), siteMap.webPages?.map(route => /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
            type: "button",
            onClick: () => handleSearch(route.cleanRoute || ""),
            className: "flex flex-row justify-between text-center items-center p-4 rounded-lg bg-white shadow-sm w-full hover:bg-gray-50",
            renderId: "render-d4672a7c",
            as: "button",
            children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "font-medium text-gray-900",
              renderId: "render-d9e2335d",
              as: "h3",
              children: route.name
            }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "text-sm text-gray-400",
              renderId: "render-733638ba",
              as: "p",
              children: route.cleanRoute
            })]
          }, route.id))]
        })
      }) : /* @__PURE__ */jsx(CreatePolymorphicComponent, {
        className: "flex flex-wrap gap-3 w-full max-w-[80rem] mx-auto pb-5 px-2",
        renderId: "render-700c8852",
        as: "div",
        children: existingRoutes.map(route => /* @__PURE__ */jsx(CreatePolymorphicComponent, {
          className: "flex flex-col flex-grow basis-full sm:basis-[calc(50%-0.375rem)] xl:basis-[calc(33.333%-0.5rem)]",
          renderId: "render-6350059a",
          as: "div",
          children: /* @__PURE__ */jsxs(CreatePolymorphicComponent, {
            className: "w-full flex-1 flex flex-col items-center ",
            renderId: "render-3ab6fbfc",
            as: "div",
            children: [/* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "relative w-full max-w-[350px] h-48 sm:h-56 lg:h-64 overflow-hidden rounded-[8px] border border-comeback-gray-75 transition-all group-hover:shadow-md",
              renderId: "render-6dad72a7",
              as: "div",
              children: /* @__PURE__ */jsx(CreatePolymorphicComponent, {
                type: "button",
                onClick: () => handleSearch(route.url.replace(/^\//, "")),
                className: "h-full w-full rounded-[8px] bg-gray-50 bg-cover",
                renderId: "render-7a41e793",
                as: "button"
              })
            }), /* @__PURE__ */jsx(CreatePolymorphicComponent, {
              className: "pt-3 text-left text-gray-500 w-full max-w-[350px]",
              renderId: "render-e7c139d6",
              as: "p",
              children: route.path
            })]
          })
        }, route.path))
      })]
    })]
  });
});

const route2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: notFound,
  loader
}, Symbol.toStringTag, { value: 'Module' }));

const serverManifest = {'entry':{'module':'/assets/entry.client-Bsmw3UE2.js','imports':['/assets/chunk-JZWAC4HX-CGbJqjV8.js','/assets/index-D7LjVpWD.js'],'css':[]},'routes':{'root':{'id':'root','parentId':undefined,'path':'','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':true,'module':'/assets/root-CZKqPR8y.js','imports':['/assets/chunk-JZWAC4HX-CGbJqjV8.js','/assets/index-D7LjVpWD.js','/assets/PolymorphicComponent-C0l47fZH.js'],'css':['/assets/root-C8e0eLfn.css'],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'page':{'id':'page','parentId':'root','path':undefined,'index':true,'caseSensitive':undefined,'hasAction':false,'hasLoader':false,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/page-DjGhBFzg.js','imports':['/assets/PolymorphicComponent-C0l47fZH.js','/assets/chunk-JZWAC4HX-CGbJqjV8.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined},'__create/not-found':{'id':'__create/not-found','parentId':'root','path':'*','index':undefined,'caseSensitive':undefined,'hasAction':false,'hasLoader':true,'hasClientAction':false,'hasClientLoader':false,'hasClientMiddleware':false,'hasErrorBoundary':false,'module':'/assets/not-found-DzjJyz7O.js','imports':['/assets/PolymorphicComponent-C0l47fZH.js','/assets/chunk-JZWAC4HX-CGbJqjV8.js'],'css':[],'clientActionModule':undefined,'clientLoaderModule':undefined,'clientMiddlewareModule':undefined,'hydrateFallbackModule':undefined}},'url':'/assets/manifest-054b895b.js','version':'054b895b','sri':undefined};

const assetsBuildDirectory = "build\\client";
      const basename = "/";
      const future = {"unstable_optimizeDeps":false,"unstable_subResourceIntegrity":false,"unstable_trailingSlashAwareDataRequests":false,"v8_middleware":false,"v8_splitRouteModules":false,"v8_viteEnvironmentApi":false};
      const ssr = true;
      const isSpaMode = false;
      const prerender = [];
      const routeDiscovery = {"mode":"lazy","manifestPath":"/__manifest"};
      const publicPath = "/";
      const entry = { module: entryServer };
      const routes = {
        "root": {
          id: "root",
          parentId: undefined,
          path: "",
          index: undefined,
          caseSensitive: undefined,
          module: route0
        },
  "page": {
          id: "page",
          parentId: "root",
          path: undefined,
          index: true,
          caseSensitive: undefined,
          module: route1
        },
  "__create/not-found": {
          id: "__create/not-found",
          parentId: "root",
          path: "*",
          index: undefined,
          caseSensitive: undefined,
          module: route2
        }
      };
      
      const allowedActionOrigins = false;

export { allowedActionOrigins, serverManifest as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr };
