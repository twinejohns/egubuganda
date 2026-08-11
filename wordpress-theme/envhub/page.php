<?php
/**
 * Static page.
 *
 * @package envhub
 */

get_header();

while ( have_posts() ) :
	the_post();
	?>
	<section class="page-hero">
		<div class="container-narrow">
			<h1><?php the_title(); ?></h1>
		</div>
	</section>

	<section class="section">
		<div class="container-narrow">
			<div class="entry-content"><?php the_content(); ?></div>
		</div>
	</section>
	<?php
endwhile;

get_footer();
