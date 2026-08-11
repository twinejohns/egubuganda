<?php
/**
 * 404 template.
 *
 * @package envhub
 */

get_header();
?>

<section class="page-hero">
	<div class="container-narrow">
		<h1><?php esc_html_e( 'Page not found', 'envhub' ); ?></h1>
		<p><?php esc_html_e( 'The page you are looking for does not exist or has been moved.', 'envhub' ); ?></p>
	</div>
</section>

<section class="section">
	<div class="container-narrow">
		<a class="btn" href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Go home', 'envhub' ); ?></a>
	</div>
</section>

<?php get_footer(); ?>
