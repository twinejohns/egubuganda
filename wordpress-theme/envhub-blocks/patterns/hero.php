<?php
/**
 * Title: Hero banner
 * Slug: envhub-blocks/hero
 * Categories: envhub, banner
 * Description: Full-width cover hero with headline, intro copy and two calls to action.
 */
?>
<!-- wp:cover {"url":"<?php echo esc_url( get_template_directory_uri() ); ?>/assets/img/hero-1.jpg","dimRatio":70,"overlayColor":"brand-dark","minHeight":78,"minHeightUnit":"vh","isDark":true,"align":"full","className":"envhub-hero","style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-cover alignfull envhub-hero" style="padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--70);min-height:78vh"><span aria-hidden="true" class="wp-block-cover__background has-brand-dark-background-color has-background-dim-70 has-background-dim"></span><img class="wp-block-cover__image-background" src="<?php echo esc_url( get_template_directory_uri() ); ?>/assets/img/hero-1.jpg" alt="Community tree planting in Uganda" data-object-fit="cover"/><div class="wp-block-cover__inner-container"><!-- wp:heading {"textAlign":"center","level":1,"textColor":"base"} -->
<h1 class="wp-block-heading has-text-align-center has-base-color has-text-color">Welcome to Environmental Hub Uganda</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","textColor":"base","fontSize":"large"} -->
<p class="has-text-align-center has-base-color has-text-color has-large-font-size">A youth-led NGO promoting sustainability and resilience in Uganda through climate action, conservation, education and research. Join us in building a greener future where nature thrives and communities prosper.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="/about">About us</a></div>
<!-- /wp:button -->

<!-- wp:button {"className":"is-style-outline","textColor":"base"} -->
<div class="wp-block-button is-style-outline"><a class="wp-block-button__link has-base-color has-text-color wp-element-button" href="/get-involved">Get involved</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div></div>
<!-- /wp:cover -->
