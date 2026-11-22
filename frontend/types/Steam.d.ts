interface StoreBrowseItemDataRequest {
  apply_user_filters?: boolean;
  include_all_purchase_options?: boolean;
  include_assets?: boolean;
  include_assets_without_overrides?: boolean;
  include_basic_info?: boolean;
  include_full_description?: boolean;
  include_included_items?: boolean;
  include_links?: boolean;
  include_platforms?: boolean;
  include_ratings?: boolean;
  include_release?: boolean;
  include_reviews?: boolean;
  include_screenshots?: boolean;
  include_supported_languages?: boolean;
  include_tag_count?: number;
  include_trailers?: boolean;
  included_item_data_request?: StoreBrowseItemDataRequest;
}

interface StoreAppAssetsItem {
  ConstructAssetURL(j, A): string;
  GetCommunityIconURL(): string;
  GetCommunityIconURL_Full(): string;
  GetHeaderURL(): string;
  GetHeroCapsuleURL(): string;
  GetHeroCapsuleURL_2x(): string;
  GetLibraryCapsuleURL(): string;
  GetLibraryCapsuleURL_2x(): string;
  GetLibraryHeroURL(): string;
  GetLibraryHeroURL_2x(): string;
  GetMainCapsuleURL(): string;
  GetPackageHeaderURL(): string;
  GetPageBackgroundURL(): string;
  GetRawPageBackgroundURL(): string;
  GetSmallCapsuleURL(): string;
}

interface StoreApp {
  GetAllCreatorClanIDs(): unknown;
  GetAllDeveloperCreatorClans(): unknown;
  GetAllFranchiseCreatorClans(): unknown;
  GetAllLanguagesWithSomeSupport(): unknown;
  GetAllPublisherCreatorClans(): unknown;
  GetAllPurchaseOptions(): unknown;
  GetAllTrailers(): unknown;
  GetAppID(): unknown;
  GetAppType(): unknown;
  GetAssets(): StoreAppAssetsItem;
  GetAssetsWithoutOverrides(): unknown;
  GetBestPurchaseOption(): unknown;
  GetBestPurchaseOriginalPriceFormatted(): unknown;
  GetBestPurchaseOriginalPriceInCents(): unknown;
  GetBestPurchasePriceFormatted(): unknown;
  GetBestPurchasePriceInCents(): number | undefined;
  GetCapsuleHeadline(): unknown;
  GetCommunityDiscussionForumsURL(): string | null;
  GetCommunityPageURL(): string | null;
  GetContentDescriptorIDs(): unknown;
  GetDataRequest(): unknown;
  GetDemoAppIDs(): unknown;
  GetDemoStandaloneStorePageAppIDs(): unknown;
  GetDeveloperNames(): unknown;
  GetFilteredReviewSummary(): unknown;
  GetFilteredReviewSummaryLanguage(): unknown;
  GetFormattedSteamReleaseDate(): unknown;
  GetFranchiseNames(): unknown;
  GetFreeWeekendEnd(): unknown;
  GetFreeWeekendPlayTextOverride(): unknown;
  GetFullDescriptionBBCode(): unknown;
  GetID(): unknown;
  GetIncludedAppIDs(): unknown;
  GetIncludedAppIDsOrSelf(): unknown;
  GetIncludedAppTypes(): unknown;
  GetInternalName(): unknown;
  GetLinks(): unknown;
  GetMicroTrailer(e: unknown): unknown;
  GetName(): unknown;
  GetOriginalReleaseDateRTime(): unknown;
  GetParentAppID(): unknown;
  GetPlatforms(): unknown;
  GetPublisherNames(): unknown;
  /** @param e default: !1 */
  GetReleaseDateRTime(e?: boolean): unknown;
  GetSalePageVanityURL(): unknown;
  GetScreenshots(e: unknown): unknown;
  GetSelfPurchaseOption(): unknown;
  GetShortDescription(): unknown;
  GetStoreCategories_Controller(): unknown;
  GetStoreCategories_Features(): unknown;
  GetStoreCategories_SupportedPlayers(): unknown;
  GetStoreItemType(): unknown;
  /** @param e default: !1 */
  GetStorePageURL(e?: boolean): unknown;
  GetStorePageURLOverride(): unknown;
  GetStorePageURLWithOverride(): unknown;
  GetTagIDs(): unknown;
  GetTags(): unknown;
  GetUnfilteredReviewSummary(): unknown;
  GetUniqueID(): string;
  GetUserFilterFailure(): unknown;
  HasContentDescriptorID(e: unknown): unknown;
  HasDemoStandaloneStorePage(): boolean;
  MergeData(e: unknown, t: unknown): void;
  ReplaceBestPurchaseOption(e: unknown): void;
}

/**
 * Minimal interface for just the bits I need right now
 */
export interface StoreItemCache {
  GetApp(appId: number): StoreApp | undefined;
  QueueAppRequest(appId: number, dataRequest: StoreBrowseItemDataRequest): Promise<number>;
}

declare global {
  const StoreItemCache: StoreItemCache;
}
