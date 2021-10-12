<?php
add_theme_support( 'post-thumbnails' );

// Add Context to Timber
add_filter('timber_context', 'add_to_context');
function add_to_context($data) {
    $config = array(
        'site_name'         => 'firstpage',
        'site_phone'        => '1300 479 226',
        'site_email'        => 'info@firstpage.com.au',
        'site_address'      => 'Lv 6, 534 Church Street,<br />Richmond VIC 3121',
        'session_value'     => '$2000',
        'session_value_alt' => '$2000',
        'review_id'         => '',
        'gtm_id'            => '',
        'gtag_id'           => '',
        'gtag_label'        => '',
        'map_api_key'   => 'AIzaSyDrvVkXhmGglK_A80mh_1grmeBAcMJCG0o',
        'map_location'  => json_encode(
            array( 
                'lat'     => -37.828710,
                'lng'     => 144.997180,
                'name'    => 'First Page',
                'address' => 'Lv 6, 534 Church Street, Richmond VIC 3121'
            )
        ),
        'post_id'           => get_the_ID(),
        'home_url'          => function_exists('pll_home_url') ? pll_home_url() : get_site_url().'/',
        'asset_version'     => '1.0.099',
        'footer_widget'     => Timber::get_widgets('footer_widget')
    );

    $output = array_merge($config, $data);
    return $output;
}

// Page Slug Body Class
add_filter( 'body_class', 'add_slug_body_class' );
function add_slug_body_class( $classes ) {
    global $post;
    if ( isset( $post ) ) {
        $classes[] = $post->post_type . '-' . $post->post_name;
    }
    return $classes;
}

// Register Widgets
add_action( 'widgets_init', 'add_widgets_init' );
function add_widgets_init() {
    register_sidebar( array(
        'name'  => __('Footer Widget', 'firstpage'),
        'id'    => 'footer_widget',
        'description'   => __( 'Footer widget area', 'firstpage' ),
        'before_widget' => '<div id="%1$s" class="widget-container %2$s">',
        'after_widget'  => '</div>'
    ) );         
}

// Allow Draft as Parent
add_filter('page_attributes_dropdown_pages_args', 'allow_attributes_dropdown_pages_args', 1, 1);
function allow_attributes_dropdown_pages_args($dropdown_args) {
    $dropdown_args['post_status'] = array('publish','draft');
    return $dropdown_args;
}


//
add_action('wp_ajax_myfilter', 'blog_filter_function'); // wp_ajax_{ACTION HERE} 
add_action('wp_ajax_nopriv_myfilter', 'blog_filter_function');
 
function blog_filter_function(){
	$args = array(
        'posts_per_page' => -1,
		'orderby' => 'date', // we will sort posts by date
		'order'	=> $_POST['date'] // ASC or DESC
	);
 
	// for taxonomies / categories
	if( isset( $_POST['categoryfilter'] ) )
		$args['tax_query'] = array(
            // 'relation' => 'AND',
			array(
				'taxonomy' => 'category',
				'field' => 'id',
				'terms' => $_POST['categoryfilter']
			)
		);
 
	$query = new WP_Query( $args );
    $author_id=$post->post_author;
 
	if( $query->have_posts() ) :
		while( $query->have_posts() ): $query->the_post();
        
echo '<div class="blog-cont col-12 col-md-6">';
echo '<div class="blog-content blog-content-card">';
if(in_category("1") ) {
  echo '<a class="image-wrapper post-thumbnail is-video" href="' . get_permalink( get_the_ID() ) . '">';
} else {
  echo '<a class="image-wrapper post-thumbnail" href="' . get_permalink( get_the_ID() ) . '">';
}
echo '<img src="' . get_the_post_thumbnail_url( get_the_ID() ) . '" alt="' . $query->post->post_title . '">';
echo '<span class="post-length">' .get_post_meta( get_the_ID(), 'post_length', true). '<br>minute<br>read</span>';
echo '</a>';
echo '<div class="post-desc">';
echo '<div class="post-avatar" style="background-image: url(' . get_avatar_url( get_the_author_meta( 'ID' ) ) . ')"></div>';
echo '<div class="post-info"><span class="post-author">'. get_the_author_meta( 'display_name' , $author_id ) .'</span><br><span class="post-date">'. get_the_date("d/m/Y") .'</span></div>';
echo '</div>';
echo '<div class="post-content">';
echo '<h2 class="post-title"><a href="' . get_permalink( get_the_ID() ) . '">' . $query->post->post_title . '</a></h2>';
echo '<div class="blog-link">';
echo '<a href="' . get_permalink( get_the_ID() ) . '">Read more</a>';
echo '</div>';
echo '</div>';
echo '</div>';
echo '</div>';


endwhile;
wp_reset_postdata();
else :
echo 'No posts found';
endif;

die();
}

remove_filter('pre_user_description', 'wp_filter_kses');  
add_filter( 'pre_user_description', 'wp_filter_post_kses' ); 


function simpay_custom_add_default_coupon() {
    $default = "1.00";
    $url_var = 'amt';
    $amt = isset( $_GET[ $url_var ] ) ? sanitize_text_field( $_GET[ $url_var ] ) : $default;
    $disabled = isset( $_GET[ $url_var ] ) ? true : false;
      wp_add_inline_script(
        'simpay-public-pro',
        "jQuery( document ).on( 'simpayBindCoreFormEventsAndTriggers', function( e, spFormElem, formData ) {
            spFormElem.find( '.simpay-amount-input' ).val( '{$amt}'  );
            spFormElem.find( '.simpay-amount-input' ).prop('disabled', $disabled);
            console.log($disabled)
            const fireEvent = (element, eventType='blur') => element && element.dispatchEvent(new Event(eventType));
            var input_title = document.getElementById( 'simpay-form-13064-field-6' );
            fireEvent(input_title)
        } );"
      );
  }
  add_action( 'wp_enqueue_scripts', 'simpay_custom_add_default_coupon' );


  remove_action( 'wp_head', 'rsd_link' );
remove_action( 'wp_head', 'wp_generator' );
remove_action( 'wp_head', 'feed_links', 2 );
remove_action( 'wp_head', 'index_rel_link' );
remove_action( 'wp_head', 'wlwmanifest_link' );
remove_action( 'wp_head', 'feed_links_extra', 3 );
remove_action( 'wp_head', 'wp_shortlink_wp_head', 10, 0 );
remove_action( 'wp_head', 'rest_output_link_wp_head');
remove_action( 'wp_head', 'wp_oembed_add_discovery_links');
remove_action( 'template_redirect', 'rest_output_link_header', 11 );

function itsme_disable_feed() {
    wp_die( __( 'No feed available, please visit the <a href="'. esc_url( home_url( '/' ) ) .'">homepage</a>!' ) );
}
add_action('do_feed', 'itsme_disable_feed', 1);
add_action('do_feed_rdf', 'itsme_disable_feed', 1);
add_action('do_feed_rss', 'itsme_disable_feed', 1);
add_action('do_feed_rss2', 'itsme_disable_feed', 1);
add_action('do_feed_atom', 'itsme_disable_feed', 1);
add_action('do_feed_rss2_comments', 'itsme_disable_feed', 1);
add_action('do_feed_atom_comments', 'itsme_disable_feed', 1);

remove_action( 'wp_head', 'feed_links_extra', 3 );
remove_action( 'wp_head', 'feed_links', 2 );


// // Remove the REST API endpoint.
// remove_action( 'rest_api_init', 'wp_oembed_register_route' );
// // Turn off oEmbed auto discovery.
// add_filter( 'embed_oembed_discover', '__return_false' );
// // Don't filter oEmbed results.
// remove_filter( 'oembed_dataparse', 'wp_filter_oembed_result', 10 );
// // Remove oEmbed discovery links.
// remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
// // Remove oEmbed-specific JavaScript from the front-end and back-end.
// remove_action( 'wp_head', 'wp_oembed_add_host_js' );
// // Remove all embeds rewrite rules.
// add_filter( 'rewrite_rules_array', 'disable_embeds_rewrites' );