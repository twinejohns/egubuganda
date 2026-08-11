<?php
/**
 * Blog index / archive / search.
 *
 * @package envhub
 */

get_header();
?>

<section class="page-hero">
	<div class="container">
		<h1>
			<?php
			if ( is_search() ) {
				printf( esc_html__( 'Search results for “%s”', 'envhub' ), esc_html( get_search_query() ) );
			} elseif ( is_archive() ) {
				echo esc_html( wp_strip_all_tags( get_the_archive_title() ) );
			} else {
				echo esc_html( get_theme_mod( 'envhub_blog_title', __( 'From the field', 'envhub' ) ) );
			}
			?>
		</h1>
		<p><?php esc_html_e( 'Notes, research and stories from our work across Uganda.', 'envhub' ); ?></p>
	</div>
</section>

<section class="section">
	<div class="container">
		<?php if ( have_posts() ) : ?>
			<div class="card-grid card-grid--posts">
				<?php
				while ( have_posts() ) :
					the_post();
					$cats = get_the_category();
					?>
					<article <?php post_class( 'card' ); ?>>
						<?php if ( has_post_thumbnail() ) : ?>
							<div class="card__thumb"><a href="<?php the_permalink(); ?>"><?php the_post_thumbnail( 'medium_large' ); ?></a></div>
						<?php endif; ?>
						<?php if ( $cats ) : ?>
							<span class="card__tag"><?php echo esc_html( $cats[0]->name ); ?></span>
						<?php endif; ?>
						<h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
						<p><?php echo esc_html( get_the_excerpt() ); ?></p>
					</article>
				<?php endwhile; ?>
			</div>

			<div class="pagination"><?php echo wp_kses_post( paginate_links( array( 'type' => 'list' ) ) ); ?></div>
		<?php else : ?>
			<p class="lead"><?php esc_html_e( 'No posts found yet. Check back soon.', 'envhub' ); ?></p>
		<?php endif; ?>
	</div>
</section>

<?php get_footer(); ?>
