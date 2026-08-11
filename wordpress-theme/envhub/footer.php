<?php
/**
 * Footer template.
 *
 * @package envhub
 */
?>
</main>

<footer class="site-footer">
	<div class="footer__grid">
		<div>
			<h3><?php echo esc_html( get_bloginfo( 'name' ) ); ?></h3>
			<p><?php echo esc_html( get_bloginfo( 'description' ) ); ?></p>
		</div>

		<div>
			<h4><?php esc_html_e( 'Useful links', 'envhub' ); ?></h4>
			<?php
			wp_nav_menu( array(
				'theme_location' => 'footer',
				'container'      => false,
				'depth'          => 1,
				'fallback_cb'    => 'envhub_default_nav',
			) );
			?>
		</div>

		<div>
			<h4><?php esc_html_e( 'Follow us', 'envhub' ); ?></h4>
			<div class="socials">
				<?php
				$socials = array(
					'twitter'   => __( 'X', 'envhub' ),
					'instagram' => __( 'Instagram', 'envhub' ),
					'linkedin'  => __( 'LinkedIn', 'envhub' ),
					'youtube'   => __( 'YouTube', 'envhub' ),
				);
				foreach ( $socials as $key => $label ) :
					$url = get_theme_mod( 'envhub_' . $key );
					if ( ! $url ) {
						continue;
					}
					?>
					<a href="<?php echo esc_url( $url ); ?>" target="_blank" rel="noreferrer" aria-label="<?php echo esc_attr( $label ); ?>">
						<?php echo envhub_icon( $key ); // phpcs:ignore WordPress.Security.EscapeOutput ?>
					</a>
				<?php endforeach; ?>
			</div>
		</div>
	</div>

	<div class="footer__bottom">
		&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> <?php echo esc_html( get_bloginfo( 'name' ) ); ?>. <?php esc_html_e( 'All rights reserved.', 'envhub' ); ?>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
