
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T


export const LanguageSwitcher: typeof import("../components/LanguageSwitcher.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const LCircle: typeof import("@vue-leaflet/vue-leaflet")['LCircle']
export const LCircleMarker: typeof import("@vue-leaflet/vue-leaflet")['LCircleMarker']
export const LControl: typeof import("@vue-leaflet/vue-leaflet")['LControl']
export const LControlAttribution: typeof import("@vue-leaflet/vue-leaflet")['LControlAttribution']
export const LControlLayers: typeof import("@vue-leaflet/vue-leaflet")['LControlLayers']
export const LControlScale: typeof import("@vue-leaflet/vue-leaflet")['LControlScale']
export const LControlZoom: typeof import("@vue-leaflet/vue-leaflet")['LControlZoom']
export const LFeatureGroup: typeof import("@vue-leaflet/vue-leaflet")['LFeatureGroup']
export const LGeoJson: typeof import("@vue-leaflet/vue-leaflet")['LGeoJson']
export const LIcon: typeof import("@vue-leaflet/vue-leaflet")['LIcon']
export const LImageOverlay: typeof import("@vue-leaflet/vue-leaflet")['LImageOverlay']
export const LLayerGroup: typeof import("@vue-leaflet/vue-leaflet")['LLayerGroup']
export const LMap: typeof import("@vue-leaflet/vue-leaflet")['LMap']
export const LMarker: typeof import("@vue-leaflet/vue-leaflet")['LMarker']
export const LPolygon: typeof import("@vue-leaflet/vue-leaflet")['LPolygon']
export const LPolyline: typeof import("@vue-leaflet/vue-leaflet")['LPolyline']
export const LPopup: typeof import("@vue-leaflet/vue-leaflet")['LPopup']
export const LRectangle: typeof import("@vue-leaflet/vue-leaflet")['LRectangle']
export const LTileLayer: typeof import("@vue-leaflet/vue-leaflet")['LTileLayer']
export const LTooltip: typeof import("@vue-leaflet/vue-leaflet")['LTooltip']
export const LWmsTileLayer: typeof import("@vue-leaflet/vue-leaflet")['LWmsTileLayer']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazyLanguageSwitcher: LazyComponent<typeof import("../components/LanguageSwitcher.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyLCircle: LazyComponent<typeof import("@vue-leaflet/vue-leaflet")['LCircle']>
export const LazyLCircleMarker: LazyComponent<typeof import("@vue-leaflet/vue-leaflet")['LCircleMarker']>
export const LazyLControl: LazyComponent<typeof import("@vue-leaflet/vue-leaflet")['LControl']>
export const LazyLControlAttribution: LazyComponent<typeof import("@vue-leaflet/vue-leaflet")['LControlAttribution']>
export const LazyLControlLayers: LazyComponent<typeof import("@vue-leaflet/vue-leaflet")['LControlLayers']>
export const LazyLControlScale: LazyComponent<typeof import("@vue-leaflet/vue-leaflet")['LControlScale']>
export const LazyLControlZoom: LazyComponent<typeof import("@vue-leaflet/vue-leaflet")['LControlZoom']>
export const LazyLFeatureGroup: LazyComponent<typeof import("@vue-leaflet/vue-leaflet")['LFeatureGroup']>
export const LazyLGeoJson: LazyComponent<typeof import("@vue-leaflet/vue-leaflet")['LGeoJson']>
export const LazyLIcon: LazyComponent<typeof import("@vue-leaflet/vue-leaflet")['LIcon']>
export const LazyLImageOverlay: LazyComponent<typeof import("@vue-leaflet/vue-leaflet")['LImageOverlay']>
export const LazyLLayerGroup: LazyComponent<typeof import("@vue-leaflet/vue-leaflet")['LLayerGroup']>
export const LazyLMap: LazyComponent<typeof import("@vue-leaflet/vue-leaflet")['LMap']>
export const LazyLMarker: LazyComponent<typeof import("@vue-leaflet/vue-leaflet")['LMarker']>
export const LazyLPolygon: LazyComponent<typeof import("@vue-leaflet/vue-leaflet")['LPolygon']>
export const LazyLPolyline: LazyComponent<typeof import("@vue-leaflet/vue-leaflet")['LPolyline']>
export const LazyLPopup: LazyComponent<typeof import("@vue-leaflet/vue-leaflet")['LPopup']>
export const LazyLRectangle: LazyComponent<typeof import("@vue-leaflet/vue-leaflet")['LRectangle']>
export const LazyLTileLayer: LazyComponent<typeof import("@vue-leaflet/vue-leaflet")['LTileLayer']>
export const LazyLTooltip: LazyComponent<typeof import("@vue-leaflet/vue-leaflet")['LTooltip']>
export const LazyLWmsTileLayer: LazyComponent<typeof import("@vue-leaflet/vue-leaflet")['LWmsTileLayer']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>

export const componentNames: string[]
