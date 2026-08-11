<?php
/**
 * EnvHub Uganda theme functions.
 *
 * @package envhub
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'ENVHUB_VERSION', '1.0.0' );

/* -------------------------------------------------------------------------
 * Theme setup
 * ---------------------------------------------------------------------- */
function envhub_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'custom-logo', array(
		'height'      => 60,
		'width'       => 240,
		'flex-height' => true,
		'flex-width'  => true,
	) );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );

	register_nav_menus( array(
		'primary' => __( 'Primary menu', 'envhub' ),
		'footer'  => __( 'Footer links', 'envhub' ),
	) );
}
add_action( 'after_setup_theme', 'envhub_setup' );

function envhub_assets() {
	wp_enqueue_style( 'envhub-style', get_stylesheet_uri(), array(), ENVHUB_VERSION );
	wp_enqueue_script( 'envhub-script', get_template_directory_uri() . '/assets/js/theme.js', array(), ENVHUB_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'envhub_assets' );

/* -------------------------------------------------------------------------
 * Content types: hero slides, services, FAQs, partners
 * ---------------------------------------------------------------------- */
function envhub_register_post_types() {
	$types = array(
		'envhub_slide'   => array( __( 'Hero Slides', 'envhub' ), __( 'Hero Slide', 'envhub' ), 'dashicons-images-alt2', array( 'title', 'editor', 'thumbnail', 'page-attributes' ) ),
		'envhub_service' => array( __( 'Services', 'envhub' ), __( 'Service', 'envhub' ), 'dashicons-palmtree', array( 'title', 'editor', 'page-attributes' ) ),
		'envhub_faq'     => array( __( 'FAQs', 'envhub' ), __( 'FAQ', 'envhub' ), 'dashicons-editor-help', array( 'title', 'editor', 'page-attributes' ) ),
		'envhub_partner' => array( __( 'Partners', 'envhub' ), __( 'Partner', 'envhub' ), 'dashicons-groups', array( 'title', 'thumbnail', 'page-attributes' ) ),
	);

	foreach ( $types as $slug => $args ) {
		register_post_type( $slug, array(
			'labels'       => array(
				'name'          => $args[0],
				'singular_name' => $args[1],
				'add_new_item'  => sprintf( __( 'Add %s', 'envhub' ), $args[1] ),
				'edit_item'     => sprintf( __( 'Edit %s', 'envhub' ), $args[1] ),
			),
			'public'       => false,
			'show_ui'      => true,
			'show_in_menu' => true,
			'show_in_rest' => true,
			'menu_icon'    => $args[2],
			'supports'     => $args[3],
			'has_archive'  => false,
		) );
	}
}
add_action( 'init', 'envhub_register_post_types' );

/**
 * Fetch entries for a theme post type, ordered by menu order.
 *
 * @param string $type Post type slug.
 * @param int    $limit Number of posts.
 * @return WP_Post[]
 */
function envhub_get_entries( $type, $limit = 12 ) {
	return get_posts( array(
		'post_type'      => $type,
		'posts_per_page' => $limit,
		'orderby'        => array( 'menu_order' => 'ASC', 'date' => 'ASC' ),
		'post_status'    => 'publish',
	) );
}

/* -------------------------------------------------------------------------
 * Icon meta box (services)
 * ---------------------------------------------------------------------- */
function envhub_icon_choices() {
	return array( 'leaf', 'shield', 'sprout', 'mountain', 'users', 'flask' );
}

function envhub_add_meta_boxes() {
	add_meta_box( 'envhub_icon', __( 'Icon', 'envhub' ), 'envhub_icon_meta_box', 'envhub_service', 'side' );
	add_meta_box( 'envhub_cta', __( 'Slide button', 'envhub' ), 'envhub_cta_meta_box', 'envhub_slide', 'side' );
}
add_action( 'add_meta_boxes', 'envhub_add_meta_boxes' );

function envhub_icon_meta_box( $post ) {
	wp_nonce_field( 'envhub_meta', 'envhub_meta_nonce' );
	$current = get_post_meta( $post->ID, '_envhub_icon', true );
	echo '<select name="envhub_icon" style="width:100%">';
	foreach ( envhub_icon_choices() as $icon ) {
		printf( '<option value="%1$s" %2$s>%1$s</option>', esc_attr( $icon ), selected( $current, $icon, false ) );
	}
	echo '</select>';
}

function envhub_cta_meta_box( $post ) {
	wp_nonce_field( 'envhub_meta', 'envhub_meta_nonce' );
	$label = get_post_meta( $post->ID, '_envhub_cta_label', true );
	$url   = get_post_meta( $post->ID, '_envhub_cta_url', true );
	printf(
		'<p><label>%1$s<br><input type="text" name="envhub_cta_label" value="%2$s" style="width:100%%"></label></p>
		 <p><label>%3$s<br><input type="text" name="envhub_cta_url" value="%4$s" style="width:100%%"></label></p>',
		esc_html__( 'Button label', 'envhub' ),
		esc_attr( $label ),
		esc_html__( 'Button URL', 'envhub' ),
		esc_attr( $url )
	);
}

function envhub_save_meta( $post_id ) {
	if ( ! isset( $_POST['envhub_meta_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['envhub_meta_nonce'] ) ), 'envhub_meta' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	if ( isset( $_POST['envhub_icon'] ) ) {
		$icon = sanitize_key( wp_unslash( $_POST['envhub_icon'] ) );
		if ( in_array( $icon, envhub_icon_choices(), true ) ) {
			update_post_meta( $post_id, '_envhub_icon', $icon );
		}
	}
	if ( isset( $_POST['envhub_cta_label'] ) ) {
		update_post_meta( $post_id, '_envhub_cta_label', sanitize_text_field( wp_unslash( $_POST['envhub_cta_label'] ) ) );
	}
	if ( isset( $_POST['envhub_cta_url'] ) ) {
		update_post_meta( $post_id, '_envhub_cta_url', esc_url_raw( wp_unslash( $_POST['envhub_cta_url'] ) ) );
	}
}
add_action( 'save_post', 'envhub_save_meta' );

/* -------------------------------------------------------------------------
 * Customizer: about, contact details, socials
 * ---------------------------------------------------------------------- */
function envhub_customize_register( $wp_customize ) {
	$wp_customize->add_section( 'envhub_about', array(
		'title'    => __( 'Homepage: About', 'envhub' ),
		'priority' => 30,
	) );

	$fields = array(
		'about_eyebrow'   => array( __( 'Eyebrow', 'envhub' ), 'About us', 'text' ),
		'about_heading'   => array( __( 'Heading', 'envhub' ), 'Green greetings, dear esteemed environmentalists', 'text' ),
		'about_text'      => array( __( 'Director message', 'envhub' ), '', 'textarea' ),
		'about_name'      => array( __( 'Director name', 'envhub' ), 'MUHUMURE RODRICK', 'text' ),
		'about_role'      => array( __( 'Director role', 'envhub' ), 'Director', 'text' ),
		'mission'         => array( __( 'Mission', 'envhub' ), 'To promote community involvement in creating a sustainable environment for generations.', 'textarea' ),
		'vision'          => array( __( 'Vision', 'envhub' ), 'Creating a sustainable environment for improved quality of life and socio-economic transformation.', 'textarea' ),
	);

	foreach ( $fields as $key => $field ) {
		$wp_customize->add_setting( 'envhub_' . $key, array(
			'default'           => $field[1],
			'sanitize_callback' => 'textarea' === $field[2] ? 'wp_kses_post' : 'sanitize_text_field',
		) );
		$wp_customize->add_control( 'envhub_' . $key, array(
			'label'   => $field[0],
			'section' => 'envhub_about',
			'type'    => $field[2],
		) );
	}

	$wp_customize->add_setting( 'envhub_about_image' );
	$wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'envhub_about_image', array(
		'label'   => __( 'Director photo', 'envhub' ),
		'section' => 'envhub_about',
	) ) );

	$wp_customize->add_section( 'envhub_contact', array(
		'title'    => __( 'Contact & social', 'envhub' ),
		'priority' => 31,
	) );

	$contact = array(
		'address'   => array( __( 'Address', 'envhub' ), 'Kampala, Uganda' ),
		'email'     => array( __( 'Email', 'envhub' ), 'info@envhub-ug.org' ),
		'phone'     => array( __( 'Phone', 'envhub' ), '+256 700 000 000' ),
		'donate'    => array( __( 'Donate button URL', 'envhub' ), '#contact' ),
		'twitter'   => array( __( 'X / Twitter URL', 'envhub' ), 'https://x.com/ehUganda' ),
		'instagram' => array( __( 'Instagram URL', 'envhub' ), 'https://instagram.com/environmental_hub_uganda' ),
		'linkedin'  => array( __( 'LinkedIn URL', 'envhub' ), 'https://ug.linkedin.com/company/bricks-environment-and-climate-hub-initiative-uganda-ltd' ),
		'youtube'   => array( __( 'YouTube URL', 'envhub' ), 'https://youtube.com/@Environmental_hub_Uganda' ),
	);

	foreach ( $contact as $key => $field ) {
		$wp_customize->add_setting( 'envhub_' . $key, array(
			'default'           => $field[1],
			'sanitize_callback' => 'sanitize_text_field',
		) );
		$wp_customize->add_control( 'envhub_' . $key, array(
			'label'   => $field[0],
			'section' => 'envhub_contact',
			'type'    => 'text',
		) );
	}
}
add_action( 'customize_register', 'envhub_customize_register' );

/* -------------------------------------------------------------------------
 * Inline SVG icons (lucide subset)
 * ---------------------------------------------------------------------- */
function envhub_icon( $name, $class = '' ) {
	$paths = array(
		'leaf'      => '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
		'shield'    => '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
		'sprout'    => '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
		'mountain'  => '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',
		'users'     => '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
		'flask'     => '<path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/>',
		'mail'      => '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
		'phone'     => '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
		'map-pin'   => '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
		'menu'      => '<line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>',
		'chevron-left'  => '<path d="m15 18-6-6 6-6"/>',
		'chevron-right' => '<path d="m9 18 6-6-6-6"/>',
		'twitter'   => '<path d="M4 4l11.733 16H20L8.267 4z"/><path d="M4 20l6.768-6.768M13.232 10.768L20 4"/>',
		'instagram' => '<rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
		'linkedin'  => '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
		'youtube'   => '<path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/>',
	);

	if ( empty( $paths[ $name ] ) ) {
		$name = 'leaf';
	}

	return sprintf(
		'<svg class="%s" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">%s</svg>',
		esc_attr( $class ),
		$paths[ $name ]
	);
}

/* -------------------------------------------------------------------------
 * Contact form handling (admin-post)
 * ---------------------------------------------------------------------- */
function envhub_handle_contact() {
	$redirect = wp_get_referer() ? wp_get_referer() : home_url( '/' );

	if ( ! isset( $_POST['envhub_contact_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['envhub_contact_nonce'] ) ), 'envhub_contact' ) ) {
		wp_safe_redirect( add_query_arg( 'contact', 'error', $redirect ) . '#contact' );
		exit;
	}

	// Honeypot.
	if ( ! empty( $_POST['envhub_website'] ) ) {
		wp_safe_redirect( add_query_arg( 'contact', 'sent', $redirect ) . '#contact' );
		exit;
	}

	$name    = isset( $_POST['envhub_name'] ) ? sanitize_text_field( wp_unslash( $_POST['envhub_name'] ) ) : '';
	$email   = isset( $_POST['envhub_email'] ) ? sanitize_email( wp_unslash( $_POST['envhub_email'] ) ) : '';
	$subject = isset( $_POST['envhub_subject'] ) ? sanitize_text_field( wp_unslash( $_POST['envhub_subject'] ) ) : '';
	$message = isset( $_POST['envhub_message'] ) ? sanitize_textarea_field( wp_unslash( $_POST['envhub_message'] ) ) : '';

	if ( '' === $name || ! is_email( $email ) || '' === $message ) {
		wp_safe_redirect( add_query_arg( 'contact', 'error', $redirect ) . '#contact' );
		exit;
	}

	$to      = get_theme_mod( 'envhub_email', get_option( 'admin_email' ) );
	$subject = $subject ? $subject : sprintf( __( 'Website enquiry from %s', 'envhub' ), $name );
	$body    = sprintf( "Name: %s\nEmail: %s\n\n%s", $name, $email, $message );

	wp_mail( $to, $subject, $body, array( 'Reply-To: ' . $name . ' <' . $email . '>' ) );

	wp_safe_redirect( add_query_arg( 'contact', 'sent', $redirect ) . '#contact' );
	exit;
}
add_action( 'admin_post_nopriv_envhub_contact', 'envhub_handle_contact' );
add_action( 'admin_post_envhub_contact', 'envhub_handle_contact' );

/* -------------------------------------------------------------------------
 * Helpers
 * ---------------------------------------------------------------------- */
function envhub_excerpt_length( $length ) {
	return 26;
}
add_filter( 'excerpt_length', 'envhub_excerpt_length' );

/**
 * Default nav items used before a menu is assigned.
 */
function envhub_default_nav( $args ) {
	$items = array(
		'#hero'     => __( 'Home', 'envhub' ),
		'#about'    => __( 'About', 'envhub' ),
		'#services' => __( 'Services', 'envhub' ),
		'#faqs'     => __( 'FAQs', 'envhub' ),
		'#blog'     => __( 'Blog', 'envhub' ),
		'#contact'  => __( 'Contact', 'envhub' ),
	);

	$home = is_front_page() ? '' : home_url( '/' );

	echo '<ul>';
	foreach ( $items as $hash => $label ) {
		printf( '<li><a href="%s">%s</a></li>', esc_url( $home . $hash ), esc_html( $label ) );
	}
	echo '</ul>';
}
