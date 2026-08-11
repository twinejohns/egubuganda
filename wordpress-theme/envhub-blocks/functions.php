<?php
/**
 * EnvHub Uganda Blocks — theme setup.
 *
 * @package envhub-blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'envhub_blocks_setup' ) ) {
	/**
	 * Theme supports. Block themes need very little here.
	 */
	function envhub_blocks_setup() {
		add_theme_support( 'wp-block-styles' );
		add_theme_support( 'responsive-embeds' );
		add_theme_support( 'editor-styles' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'html5', array( 'style', 'script', 'comment-form', 'comment-list' ) );
		add_editor_style( 'style.css' );
		load_theme_textdomain( 'envhub-blocks', get_template_directory() . '/languages' );
	}
}
add_action( 'after_setup_theme', 'envhub_blocks_setup' );

/**
 * Front-end styles.
 */
function envhub_blocks_enqueue() {
	wp_enqueue_style(
		'envhub-blocks-style',
		get_stylesheet_uri(),
		array(),
		wp_get_theme()->get( 'Version' )
	);
}
add_action( 'wp_enqueue_scripts', 'envhub_blocks_enqueue' );

/**
 * Pattern category so the theme patterns are grouped in the inserter.
 */
function envhub_blocks_pattern_categories() {
	register_block_pattern_category(
		'envhub',
		array( 'label' => __( 'Environmental Hub Uganda', 'envhub-blocks' ) )
	);
}
add_action( 'init', 'envhub_blocks_pattern_categories' );

/**
 * Custom block styles used by the patterns (card, accent border, pill).
 */
function envhub_blocks_register_block_styles() {
	register_block_style(
		'core/group',
		array(
			'name'  => 'envhub-card',
			'label' => __( 'Card', 'envhub-blocks' ),
		)
	);
	register_block_style(
		'core/group',
		array(
			'name'  => 'envhub-bordered',
			'label' => __( 'Accent bar', 'envhub-blocks' ),
		)
	);
	register_block_style(
		'core/paragraph',
		array(
			'name'  => 'envhub-eyebrow',
			'label' => __( 'Eyebrow', 'envhub-blocks' ),
		)
	);
}
add_action( 'init', 'envhub_blocks_register_block_styles' );
