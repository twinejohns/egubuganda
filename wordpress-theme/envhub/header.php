<?php
/**
 * Header template.
 *
 * @package envhub
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'envhub' ); ?></a>

<header class="site-header" id="site-header">
	<div class="header-inner">
		<?php if ( has_custom_logo() ) : ?>
			<div class="brand brand__logo"><?php the_custom_logo(); ?></div>
		<?php else : ?>
			<a class="brand" href="<?php echo esc_url( home_url( '/' ) ); ?>">
				<span class="brand__mark"><?php echo envhub_icon( 'leaf' ); // phpcs:ignore WordPress.Security.EscapeOutput ?></span>
				<span class="brand__text">
					<?php echo esc_html( get_bloginfo( 'name' ) ); ?><br>
					<span><?php echo esc_html( get_bloginfo( 'description' ) ); ?></span>
				</span>
			</a>
		<?php endif; ?>

		<nav class="nav-desktop" aria-label="<?php esc_attr_e( 'Primary', 'envhub' ); ?>">
			<?php
			wp_nav_menu( array(
				'theme_location' => 'primary',
				'container'      => false,
				'depth'          => 1,
				'fallback_cb'    => 'envhub_default_nav',
			) );
			?>
			<a class="btn btn--sm" href="<?php echo esc_url( get_theme_mod( 'envhub_donate', '#contact' ) ); ?>"><?php esc_html_e( 'Donate', 'envhub' ); ?></a>
		</nav>

		<button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-controls="nav-mobile" aria-label="<?php esc_attr_e( 'Toggle navigation', 'envhub' ); ?>">
			<?php echo envhub_icon( 'menu' ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
		</button>
	</div>

	<nav class="nav-mobile" id="nav-mobile" aria-label="<?php esc_attr_e( 'Mobile', 'envhub' ); ?>">
		<?php
		wp_nav_menu( array(
			'theme_location' => 'primary',
			'container'      => false,
			'depth'          => 1,
			'fallback_cb'    => 'envhub_default_nav',
		) );
		?>
	</nav>
</header>

<main id="content">
