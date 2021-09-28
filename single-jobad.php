<?php
// Single Job Ad
$context = Timber::get_context();
$context['post'] = new Timber\Post();

$args = array(
    'post_type'      => 'jobad',
    'posts_per_page' => 6,
    'post__not_in'   => array($context['post']->ID)
);

$context['listings'] = new Timber\PostQuery($args);

$page = get_page_by_path( 'careers' );

$languageID = pll_get_post($page->ID);
$context['careers_page'] = get_the_permalink($languageID);

$templates = array( 'jobad-single.twig' );
Timber::render( $templates, $context );