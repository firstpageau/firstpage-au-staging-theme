<?php
// Initialise Timber Data
$context = Timber::get_context();

// Get Reviews
$api_url    = get_site_url() . "/action/reviews/get_latest.php?busid=" . $context['review_id'];
$ch         = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $api_url);
$result     = curl_exec($ch);
$reviews    = json_decode($result);

// Get Post Details
$post = new Timber\Post();
$context['post'] = $post;

// Set Review Details
$r_count  = count($reviews);
$total_stars = 0;
foreach ($reviews as $review) {
	$total_stars += $review->rating;
}
$r_average   = $total_stars / $r_count;
$star_width  = ($r_average / 5) * 100;

$context['reviews'] = array(
    'count'      => $r_count,
    'average'    => round($r_average, 1),
    'star_width' => round($star_width, 0),
    'reviews'    => $reviews
);

// Check if there's an overwriting json file in the data directory
$reviews_file = get_stylesheet_directory() . '/data/' . pll_current_language() . '-' . 'reviews.json';
if (file_exists($reviews_file)) {
    $reviews_json = json_decode(file_get_contents($reviews_file));
    if ($reviews_json) {
        $context['reviews']['reviews'] = $reviews_json;
    }
}

// Render Template
$templates = array( pll_current_language() . '-' . 'page-reviews.twig' );
Timber::render( $templates, $context );