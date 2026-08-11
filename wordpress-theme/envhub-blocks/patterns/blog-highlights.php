<?php
/**
 * Title: Latest blog posts
 * Slug: envhub-blocks/blog-highlights
 * Categories: envhub, posts
 * Description: Three most recent posts in a card grid.
 */
?>
<!-- wp:group {"align":"full","backgroundColor":"secondary","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-secondary-background-color has-background" style="padding-top:var(--wp--preset--spacing--60);padding-bottom:var(--wp--preset--spacing--60)"><!-- wp:group {"align":"wide","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignwide"><!-- wp:paragraph {"className":"is-style-envhub-eyebrow","textColor":"primary","fontSize":"small","style":{"typography":{"fontWeight":"600","textTransform":"uppercase","letterSpacing":"0.2em"}}} -->
<p class="is-style-envhub-eyebrow has-primary-color has-text-color has-small-font-size" style="font-weight:600;letter-spacing:0.2em;text-transform:uppercase">Blog</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">From the field</h2>
<!-- /wp:heading -->

<!-- wp:query {"queryId":2,"query":{"perPage":3,"pages":1,"offset":0,"postType":"post","order":"desc","orderBy":"date","inherit":false},"style":{"spacing":{"margin":{"top":"var:preset|spacing|50"}}},"layout":{"type":"default"}} -->
<div class="wp-block-query" style="margin-top:var(--wp--preset--spacing--50)"><!-- wp:post-template {"layout":{"type":"grid","columnCount":3}} -->
<!-- wp:group {"className":"is-style-envhub-card","backgroundColor":"base","style":{"spacing":{"padding":{"top":"var:preset|spacing|40","bottom":"var:preset|spacing|40","left":"var:preset|spacing|40","right":"var:preset|spacing|40"}},"border":{"width":"1px","radius":"8px"}},"borderColor":"border","layout":{"type":"constrained"}} -->
<div class="wp-block-group is-style-envhub-card has-border-color has-border-border-color has-base-background-color has-background" style="border-width:1px;border-radius:8px;padding:var(--wp--preset--spacing--40)"><!-- wp:post-terms {"term":"category","textColor":"accent","fontSize":"small","style":{"typography":{"textTransform":"uppercase","letterSpacing":"0.1em"}}} /-->

<!-- wp:post-title {"isLink":true,"fontSize":"large"} /-->

<!-- wp:post-excerpt {"excerptLength":24,"fontSize":"small"} /--></div>
<!-- /wp:group -->
<!-- /wp:post-template -->

<!-- wp:query-no-results -->
<!-- wp:paragraph -->
<p>No posts yet — publish your first article to see it here.</p>
<!-- /wp:paragraph -->
<!-- /wp:query-no-results --></div>
<!-- /wp:query -->

<!-- wp:paragraph {"style":{"spacing":{"margin":{"top":"var:preset|spacing|40"}},"typography":{"fontWeight":"600"}}} -->
<p style="margin-top:var(--wp--preset--spacing--40);font-weight:600"><a href="/blog">Read all articles →</a></p>
<!-- /wp:paragraph --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->
