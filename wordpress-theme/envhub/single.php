<?php
/**
 * Single post.
 *
 * @package envhub
 */

get_header();

while ( have_posts() ) :
	the_post();
	?>
	<article <?php post_class(); ?>>
		<section class="page-hero">
			<div class="container-narrow">
				<h1><?php the_title(); ?></h1>
				<p><?php echo esc_html( get_the_date() ); ?> &middot; <?php echo esc_html( get_the_author() ); ?></p>
			</div>
		</section>

		<section class="section">
			<div class="container-narrow">
				<?php if ( has_post_thumbnail() ) : ?>
					<p><?php the_post_thumbnail( 'large' ); ?></p>
				<?php endif; ?>
				<div class="entry-content"><?php the_content(); ?></div>
			</div>
		</section>
	</article>
	<?php
	if ( comments_open() || get_comments_number() ) :
		?>
		<section class="section section--alt">
			<div class="container-narrow"><?php comments_template(); ?></div>
		</section>
		<?php
	endif;
endwhile;

get_footer();
