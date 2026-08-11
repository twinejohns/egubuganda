<?php
/**
 * Front page: hero carousel, about, services, FAQs, blog, partners, contact.
 *
 * @package envhub
 */

get_header();

$img = get_template_directory_uri() . '/assets/img/';

/* ----------------------------------------------------------------
 * Hero slides
 * ------------------------------------------------------------- */
$slides  = envhub_get_entries( 'envhub_slide', 8 );
$fallback_slides = array(
	array(
		'image' => $img . 'hero-1.jpg',
		'title' => __( 'Welcome to Ehub Uganda', 'envhub' ),
		'text'  => __( 'An NGO promoting sustainability and resilience in Uganda through climate change adaptation, disaster risk reduction and eco-tourism. Join us in building a greener future where nature thrives and communities prosper.', 'envhub' ),
	),
	array(
		'image' => $img . 'hero-2.jpg',
		'title' => __( 'Community-Centered Conservation', 'envhub' ),
		'text'  => __( 'Conservation that puts community well-being first — engaging local people in sustainable practices that protect natural resources and biodiversity through collaborative partnerships.', 'envhub' ),
	),
	array(
		'image' => $img . 'hero-3.jpg',
		'title' => __( 'Climate-Smart Agriculture', 'envhub' ),
		'text'  => __( 'Innovative farming techniques that adapt to a changing climate, delivering greater resilience, food security and lower emissions for Ugandan households.', 'envhub' ),
	),
);

$hero_items = array();
if ( $slides ) {
	foreach ( $slides as $slide ) {
		$hero_items[] = array(
			'image' => get_the_post_thumbnail_url( $slide, 'full' ) ? get_the_post_thumbnail_url( $slide, 'full' ) : $img . 'hero-1.jpg',
			'title' => get_the_title( $slide ),
			'text'  => wp_strip_all_tags( $slide->post_content ),
			'label' => get_post_meta( $slide->ID, '_envhub_cta_label', true ),
			'url'   => get_post_meta( $slide->ID, '_envhub_cta_url', true ),
		);
	}
} else {
	$hero_items = $fallback_slides;
}
?>

<section class="hero" id="hero" data-carousel>
	<?php foreach ( $hero_items as $i => $item ) : ?>
		<div class="hero__slide<?php echo 0 === $i ? ' is-active' : ''; ?>" aria-hidden="<?php echo 0 === $i ? 'false' : 'true'; ?>">
			<img src="<?php echo esc_url( $item['image'] ); ?>" alt="<?php echo esc_attr( $item['title'] ); ?>" width="1920" height="1080" <?php echo 0 === $i ? '' : 'loading="lazy"'; ?>>
			<div class="hero__scrim"></div>
			<div class="hero__body">
				<div class="hero__content">
					<?php if ( 0 === $i ) : ?>
						<h1><?php echo esc_html( $item['title'] ); ?></h1>
					<?php else : ?>
						<h2><?php echo esc_html( $item['title'] ); ?></h2>
					<?php endif; ?>
					<p><?php echo esc_html( $item['text'] ); ?></p>
					<a class="btn" href="<?php echo esc_url( ! empty( $item['url'] ) ? $item['url'] : '#about' ); ?>">
						<?php echo esc_html( ! empty( $item['label'] ) ? $item['label'] : __( 'Learn more', 'envhub' ) ); ?>
					</a>
				</div>
			</div>
		</div>
	<?php endforeach; ?>

	<button class="hero__arrow hero__arrow--prev" data-carousel-prev aria-label="<?php esc_attr_e( 'Previous slide', 'envhub' ); ?>"><?php echo envhub_icon( 'chevron-left' ); // phpcs:ignore ?></button>
	<button class="hero__arrow hero__arrow--next" data-carousel-next aria-label="<?php esc_attr_e( 'Next slide', 'envhub' ); ?>"><?php echo envhub_icon( 'chevron-right' ); // phpcs:ignore ?></button>

	<div class="hero__dots">
		<?php foreach ( $hero_items as $i => $item ) : ?>
			<button class="hero__dot<?php echo 0 === $i ? ' is-active' : ''; ?>" aria-label="<?php echo esc_attr( sprintf( __( 'Go to slide %d', 'envhub' ), $i + 1 ) ); ?>"></button>
		<?php endforeach; ?>
	</div>
</section>

<?php
/* ----------------------------------------------------------------
 * About / director
 * ------------------------------------------------------------- */
$about_default = '<p>' . implode( '</p><p>', array(
	__( 'Every stakeholder has a role to play in conserving the environment and in adapting to and mitigating climate change. It is with pride that we introduce our newest team player: the Bricks Environment and Climate Hub Initiative Uganda.', 'envhub' ),
	__( 'Uganda still contends with deep poverty, unpredictable seasons, persistent pests, invasive species and slow-moving political will. Environmental Hub Uganda has renewed its commitment to these challenges by placing scientific research — both qualitative and quantitative — at the centre of conservation and climate action.', 'envhub' ),
	__( 'Too little, and too often the wrong information, is known about the African continent. Through joint initiatives with academia in East Africa and Europe, we work to provide timely, accurate information that supports rapid but sustainable development. The African Research Institute of Environment and Climate (ARIEC), hosted by the Department of Environmental Sciences at Kyambogo University, introduces multi-sector training and mentorship through field and exchange programmes while fostering gender equity and locally rooted innovation.', 'envhub' ),
	__( 'At the Hub we back start-ups across the environmental sector, with particular attention to marginalised groups — persons with disabilities, and women- and youth-led ventures — and we stand at the frontline of adaptation and mitigation efforts.', 'envhub' ),
) ) . '</p>';

$about_text  = get_theme_mod( 'envhub_about_text' );
$about_image = get_theme_mod( 'envhub_about_image', $img . 'director.jpg' );
?>
<section class="section" id="about">
	<div class="container">
		<p class="eyebrow"><?php echo esc_html( get_theme_mod( 'envhub_about_eyebrow', __( 'About us', 'envhub' ) ) ); ?></p>
		<h2 class="section-title"><?php echo esc_html( get_theme_mod( 'envhub_about_heading', __( 'Green greetings, dear esteemed environmentalists', 'envhub' ) ) ); ?></h2>

		<div class="about__grid">
			<div class="about__portrait">
				<img src="<?php echo esc_url( $about_image ); ?>" alt="<?php echo esc_attr( get_theme_mod( 'envhub_about_name', 'MUHUMURE RODRICK' ) ); ?>" width="800" height="900" loading="lazy">
				<p class="about__name"><?php echo esc_html( get_theme_mod( 'envhub_about_name', 'MUHUMURE RODRICK' ) ); ?></p>
				<p class="about__role"><?php echo esc_html( get_theme_mod( 'envhub_about_role', __( 'Director', 'envhub' ) ) ); ?></p>
			</div>

			<div class="about__text">
				<?php echo wp_kses_post( $about_text ? wpautop( $about_text ) : $about_default ); ?>
			</div>
		</div>

		<div class="pillars">
			<div class="pillar">
				<h3><?php esc_html_e( 'Our Mission', 'envhub' ); ?></h3>
				<p><?php echo esc_html( get_theme_mod( 'envhub_mission', __( 'To promote community involvement in creating a sustainable environment for generations.', 'envhub' ) ) ); ?></p>
			</div>
			<div class="pillar pillar--accent">
				<h3><?php esc_html_e( 'Our Vision', 'envhub' ); ?></h3>
				<p><?php echo esc_html( get_theme_mod( 'envhub_vision', __( 'Creating a sustainable environment for improved quality of life and socio-economic transformation.', 'envhub' ) ) ); ?></p>
			</div>
		</div>
	</div>
</section>

<?php
/* ----------------------------------------------------------------
 * Services
 * ------------------------------------------------------------- */
$services = envhub_get_entries( 'envhub_service', 12 );
$service_items = array();

if ( $services ) {
	foreach ( $services as $service ) {
		$service_items[] = array(
			'icon'  => get_post_meta( $service->ID, '_envhub_icon', true ),
			'title' => get_the_title( $service ),
			'text'  => wp_strip_all_tags( $service->post_content ),
		);
	}
} else {
	$service_items = array(
		array( 'icon' => 'leaf', 'title' => __( 'Environmental Conservation', 'envhub' ), 'text' => __( 'Restoration of degraded landscapes, tree growing and biodiversity protection, delivered hand in hand with the communities who depend on them.', 'envhub' ) ),
		array( 'icon' => 'shield', 'title' => __( 'Disaster Risk Reduction', 'envhub' ), 'text' => __( 'Proactive measures that strengthen community resilience to natural hazards, combining local knowledge with technology for preparedness and response.', 'envhub' ) ),
		array( 'icon' => 'sprout', 'title' => __( 'Climate-Smart Agriculture', 'envhub' ), 'text' => __( 'Training and demonstration in adaptive, low-emission farming that raises yields while protecting soils, water and forests.', 'envhub' ) ),
		array( 'icon' => 'mountain', 'title' => __( 'Eco-Tourism', 'envhub' ), 'text' => __( 'Nature-based tourism that channels value back to custodian communities and makes conservation economically worthwhile.', 'envhub' ) ),
		array( 'icon' => 'flask', 'title' => __( 'Research & Innovation', 'envhub' ), 'text' => __( 'Qualitative and quantitative research with academic partners in East Africa and Europe, generating timely and accurate environmental data.', 'envhub' ) ),
		array( 'icon' => 'users', 'title' => __( 'Green Start-up Support', 'envhub' ), 'text' => __( 'Mentorship and incubation for environmental start-ups, with a focus on women, youth and persons with disabilities.', 'envhub' ) ),
	);
}
?>
<section class="section section--alt" id="services">
	<div class="container">
		<p class="eyebrow"><?php esc_html_e( 'What we do', 'envhub' ); ?></p>
		<h2 class="section-title"><?php esc_html_e( 'Our Services', 'envhub' ); ?></h2>

		<div class="card-grid card-grid--3">
			<?php foreach ( $service_items as $service ) : ?>
				<article class="card">
					<span class="card__icon"><?php echo envhub_icon( $service['icon'] ); // phpcs:ignore ?></span>
					<h3><?php echo esc_html( $service['title'] ); ?></h3>
					<p><?php echo esc_html( $service['text'] ); ?></p>
				</article>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<?php
/* ----------------------------------------------------------------
 * FAQs
 * ------------------------------------------------------------- */
$faqs = envhub_get_entries( 'envhub_faq', 12 );
$faq_items = array();

if ( $faqs ) {
	foreach ( $faqs as $faq ) {
		$faq_items[] = array( 'q' => get_the_title( $faq ), 'a' => wp_strip_all_tags( $faq->post_content ) );
	}
} else {
	$faq_items = array(
		array( 'q' => __( 'What does Environmental Hub Uganda do?', 'envhub' ), 'a' => __( 'We are a non-governmental organisation working across Uganda on environmental conservation, climate change adaptation and mitigation, disaster risk reduction, eco-tourism and environmental research.', 'envhub' ) ),
		array( 'q' => __( 'How can my community work with you?', 'envhub' ), 'a' => __( 'We partner with community groups, schools, local governments and cooperatives. Reach out through the contact section and our field team will discuss what a partnership could look like in your area.', 'envhub' ) ),
		array( 'q' => __( 'Do you support environmental start-ups?', 'envhub' ), 'a' => __( 'Yes. We support start-ups across environmental sectors, deliberately prioritising ventures led by women, youth and persons with disabilities.', 'envhub' ) ),
		array( 'q' => __( 'Can I volunteer or intern with the Hub?', 'envhub' ), 'a' => __( 'We run field and exchange programmes with training and mentorship components. Send us a message with your background and interests.', 'envhub' ) ),
	);
}
?>
<section class="section" id="faqs">
	<div class="container-narrow">
		<p class="eyebrow"><?php esc_html_e( 'FAQs', 'envhub' ); ?></p>
		<h2 class="section-title"><?php esc_html_e( 'Frequently asked questions', 'envhub' ); ?></h2>

		<div class="faq-list">
			<?php foreach ( $faq_items as $i => $faq ) : ?>
				<div class="faq<?php echo 0 === $i ? ' is-open' : ''; ?>">
					<button class="faq__q" type="button" aria-expanded="<?php echo 0 === $i ? 'true' : 'false'; ?>">
						<?php echo esc_html( $faq['q'] ); ?>
						<span><?php echo 0 === $i ? '&minus;' : '+'; ?></span>
					</button>
					<p class="faq__a"><?php echo esc_html( $faq['a'] ); ?></p>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<?php
/* ----------------------------------------------------------------
 * Blog
 * ------------------------------------------------------------- */
$posts_query = new WP_Query( array( 'posts_per_page' => 3, 'ignore_sticky_posts' => true ) );
if ( $posts_query->have_posts() ) :
	?>
	<section class="section section--alt" id="blog">
		<div class="container">
			<p class="eyebrow"><?php esc_html_e( 'Blog', 'envhub' ); ?></p>
			<h2 class="section-title"><?php esc_html_e( 'From the field', 'envhub' ); ?></h2>

			<div class="card-grid card-grid--posts">
				<?php
				while ( $posts_query->have_posts() ) :
					$posts_query->the_post();
					$cats = get_the_category();
					?>
					<article class="card">
						<?php if ( has_post_thumbnail() ) : ?>
							<div class="card__thumb"><?php the_post_thumbnail( 'medium_large' ); ?></div>
						<?php endif; ?>
						<?php if ( $cats ) : ?>
							<span class="card__tag"><?php echo esc_html( $cats[0]->name ); ?></span>
						<?php endif; ?>
						<h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
						<p><?php echo esc_html( get_the_excerpt() ); ?></p>
					</article>
				<?php endwhile; ?>
			</div>
		</div>
	</section>
	<?php
	wp_reset_postdata();
endif;

/* ----------------------------------------------------------------
 * Partners
 * ------------------------------------------------------------- */
$partners = envhub_get_entries( 'envhub_partner', 12 );
$partner_names = array(
	__( 'Kyambogo University', 'envhub' ),
	__( 'ARIEC', 'envhub' ),
	__( 'Ministry of Water & Environment', 'envhub' ),
	__( 'NEMA', 'envhub' ),
	__( 'Terra Initiative', 'envhub' ),
	__( 'Bricks Climate Hub', 'envhub' ),
);
?>
<section class="partners">
	<div class="container">
		<h2><?php esc_html_e( 'Our Partners', 'envhub' ); ?></h2>
		<div class="partners__grid">
			<?php if ( $partners ) : ?>
				<?php foreach ( $partners as $partner ) : ?>
					<div class="partner">
						<?php if ( has_post_thumbnail( $partner ) ) : ?>
							<?php echo get_the_post_thumbnail( $partner, 'medium', array( 'alt' => esc_attr( get_the_title( $partner ) ) ) ); ?>
						<?php else : ?>
							<?php echo esc_html( get_the_title( $partner ) ); ?>
						<?php endif; ?>
					</div>
				<?php endforeach; ?>
			<?php else : ?>
				<?php foreach ( $partner_names as $name ) : ?>
					<div class="partner"><?php echo esc_html( $name ); ?></div>
				<?php endforeach; ?>
			<?php endif; ?>
		</div>
	</div>
</section>

<?php
/* ----------------------------------------------------------------
 * Contact
 * ------------------------------------------------------------- */
$status = isset( $_GET['contact'] ) ? sanitize_key( wp_unslash( $_GET['contact'] ) ) : ''; // phpcs:ignore WordPress.Security.NonceVerification
?>
<section class="section section--alt" id="contact">
	<div class="container">
		<p class="eyebrow"><?php esc_html_e( 'Get in touch', 'envhub' ); ?></p>
		<h2 class="section-title"><?php esc_html_e( 'Contact us', 'envhub' ); ?></h2>

		<div class="contact__grid">
			<ul class="contact__list">
				<li><?php echo envhub_icon( 'map-pin' ); // phpcs:ignore ?><span><?php echo esc_html( get_theme_mod( 'envhub_address', 'Kampala, Uganda' ) ); ?></span></li>
				<li><?php echo envhub_icon( 'mail' ); // phpcs:ignore ?><span><?php echo esc_html( get_theme_mod( 'envhub_email', 'info@envhub-ug.org' ) ); ?></span></li>
				<li><?php echo envhub_icon( 'phone' ); // phpcs:ignore ?><span><?php echo esc_html( get_theme_mod( 'envhub_phone', '+256 700 000 000' ) ); ?></span></li>
			</ul>

			<form class="contact-form" method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>">
				<?php if ( 'sent' === $status ) : ?>
					<p class="form-notice form-notice--ok"><?php esc_html_e( 'Thank you — your message has been sent.', 'envhub' ); ?></p>
				<?php elseif ( 'error' === $status ) : ?>
					<p class="form-notice form-notice--err"><?php esc_html_e( 'Sorry, your message could not be sent. Please check the fields and try again.', 'envhub' ); ?></p>
				<?php endif; ?>

				<input type="hidden" name="action" value="envhub_contact">
				<?php wp_nonce_field( 'envhub_contact', 'envhub_contact_nonce' ); ?>
				<p style="display:none"><input type="text" name="envhub_website" tabindex="-1" autocomplete="off"></p>

				<div class="contact-form__row">
					<input type="text" name="envhub_name" required placeholder="<?php esc_attr_e( 'Your name', 'envhub' ); ?>" aria-label="<?php esc_attr_e( 'Your name', 'envhub' ); ?>">
					<input type="email" name="envhub_email" required placeholder="<?php esc_attr_e( 'Your email', 'envhub' ); ?>" aria-label="<?php esc_attr_e( 'Your email', 'envhub' ); ?>">
				</div>
				<input type="text" name="envhub_subject" placeholder="<?php esc_attr_e( 'Subject', 'envhub' ); ?>" aria-label="<?php esc_attr_e( 'Subject', 'envhub' ); ?>">
				<textarea name="envhub_message" rows="5" required placeholder="<?php esc_attr_e( 'Message', 'envhub' ); ?>" aria-label="<?php esc_attr_e( 'Message', 'envhub' ); ?>"></textarea>
				<button class="btn" type="submit"><?php esc_html_e( 'Send message', 'envhub' ); ?></button>
			</form>
		</div>
	</div>
</section>

<?php get_footer(); ?>
