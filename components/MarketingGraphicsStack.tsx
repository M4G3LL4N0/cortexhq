"use client";

import { ProblemContrastSection } from "./ProblemContrastSection";
import { SolutionPipelineGraphic } from "./SolutionPipelineGraphic";
import { FeatureVisualGrid } from "./FeatureVisualGrid";
import { OmniWorkflowSection } from "./OmniWorkflowSection";
import { TrustLayerGraphic } from "./TrustLayerGraphic";
import { ConversionCTAVisual } from "./ConversionCTAVisual";

export function MarketingGraphicsStack() {
  return (
    <>
      <ProblemContrastSection />
      <OmniWorkflowSection />
      <SolutionPipelineGraphic />
      <FeatureVisualGrid />
      <TrustLayerGraphic />
      <ConversionCTAVisual />
    </>
  );
}
